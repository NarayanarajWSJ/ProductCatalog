const db = require("../models");
const TotalDiscount = db.totalDiscount;
const Op = db.Sequelize.Op;

// Retrieve all TotalDiscount from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;

  TotalDiscount.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving TotalDiscounts."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  TotalDiscount.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving TotalDiscount with id=" + id
      });
    });
};

exports.create = (req, res) => {
  // Validate request
  if (!req.body.price_above || !req.body.price_below ||  !req.body.discount_price) {
    res.status(400).send({
      message: "price_above, price_below and discount_price can not be empty!"
    });
    return;
  }
  if (req.body.price_above > req.body.price_below) {
    res.status(400).send({
      message: "price_above should be greater than price_below"
    });
    return;
  }
  // Create a TotalDiscount
  const totalDiscount = {
    price_above: req.body.price_above,
    price_below: req.body.price_below,
    discount_price: req.body.discount_price,
  };

  // Save TotalDiscount in the database
  TotalDiscount.create(totalDiscount)
    .then(data => {
      res.status(201).send(data);
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

  TotalDiscount.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "TotalDiscount was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update TotalDiscount with id=${id}. Maybe TotalDiscount was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating TotalDiscount with id=" + id
      });
    });
};