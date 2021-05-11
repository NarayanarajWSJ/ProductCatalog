const db = require("../models");
const ProductDiscount = db.productDiscount;
const Op = db.Sequelize.Op;

// Retrieve all ProductDiscount from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;

  ProductDiscount.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving ProductDiscount."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  ProductDiscount.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving ProductDiscount with id=" + id
      });
    });
};

exports.create = (req, res) => {
  // Validate request
  if (!req.body.product_id || !req.body.discount_count ||  !req.body.discount_price) {
    res.status(400).send({
      message: "product_id, discount_count and discount_price can not be empty!"
    });
    return;
  }
  // Create a ProductDiscount
  const productDiscount = {
    product_id: req.body.product_id,
    discount_count: req.body.discount_count,
    discount_price: req.body.discount_price,
  };

  // Save Productdiscount in the database
  ProductDiscount.create(productDiscount)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the TotalDiscount."
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  ProductDiscount.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "ProductDiscount was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update ProductDiscount with id=${id}. Maybe ProductDiscount was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating ProductDiscount with id=" + id
      });
    });
};