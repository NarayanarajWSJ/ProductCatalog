const db = require("../models");
var _ = require('lodash');
const Cart = db.cart;
const Product = db.products;
const ProductDiscount = db.productDiscount;
const TotalDiscount = db.totalDiscount;
const Op = db.Sequelize.Op;

// Retrieve all Cart from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  Cart.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Carts."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Cart.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Cart with id=" + id
      });
    });
};

exports.create = async (req, res) => {
  // Validate request
  if (!req.body.product_id || !req.body.count) {
    res.status(400).send({
      message: "product_id and count can not be empty!"
    });
    return;
  }
  if(req.body.count <= 0){
    res.status(400).send({
      message: "product count can not be Zero or Negative!"
    });
    return;
  }
  // check product in the cart is valid
  let product  = await Product.findByPk(req.body.product_id);
  if(!product){
    res.status(500).send({
      message: "Error retrieving Product with id=" + req.body.product_id
    });
    return;
  }
  let product_in_cart  = await Cart.findOne({ where: {product_id: req.body.product_id}});
  let cart = {
    product_id: req.body.product_id,
    count: product_in_cart ? (req.body.count + product_in_cart.count) : req.body.count,
    total_price: 0,
    discount_price: 0
  };
  let product_discount  = await ProductDiscount.findOne({ where: {product_id: req.body.product_id}});
  if(product_discount){
    let total_products_in_discount = Math.floor(cart['count']/product_discount.discount_count) * product_discount.discount_price;
    let total_products_in_non_discount = (cart['count'] % product_discount.discount_count) * product.price;
    cart['total_price'] = total_products_in_discount + total_products_in_non_discount;
    cart['discount_price'] = (product.price * cart['count']) - cart['total_price'];
  }else{
    cart['total_price'] += product.price * cart['count'];
  }
  let items_count = await Cart.findAll().count;
  if(product_in_cart){
    // Existing Product
    Cart.update(cart, {
      where: { id: product_in_cart.id }
    })
      .then(num => {
        if (num == 1) {
          res.status(201).send({
            message: "Existing Items Added to the Cart",
            cart_items_count: items_count
          });
        } else {
          res.send({
            message: `Cannot update Cart with id=${id}. Maybe Cart was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Cart with id=" + id
        });
      });
  }else{
    // New Product
    Cart.create(cart)
    .then(data => {
      res.status(201).send({
        message: "New Items Added to the Cart",
        cart_items_count: items_count + 1
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Cart."
      });
    });
  }
};

exports.checkout = async (req, res) => {
  let total_discount  = await TotalDiscount.findAll();
  let cart_items = await Cart.findAll();
 
  let total_price = _.sum(_.map(cart_items, 'total_price'));
  let product_discount_price = _.sum(_.map(cart_items, 'discount_price'));

  console.log(total_discount.length); // 10
  let discount_amount = 0;
  if(total_discount && total_discount.length > 0){
    // Calculate the cart and return
    total_discount.forEach(discount => {
      if(discount.price_above < total_price && discount.price_below > total_price){
        discount_amount = discount.discount_price;
      }
    });
  }
  res.send({
    cart_items: cart_items,
    acutal_price: total_price + product_discount_price,
    price: total_price - discount_amount,
    discounted_price: discount_amount + product_discount_price,
    message: (discount_amount + product_discount_price) === 0 ? 'No Discount applied':'Discount applied'
  });
};

exports.clearCart = async (req, res) => {
  Cart.sync({ force: true })
  .then(data => {
    res.send({
      message: "Cart Cleared"
    });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while clearing the Cart."
    });
  });
};