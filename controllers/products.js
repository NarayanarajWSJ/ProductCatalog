const db = require("../models");
const Products = db.products;
const Op = db.Sequelize.Op;

// Retrieve all Products from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;

  Products.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Products."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Products.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Product with id=" + id
      });
    });
};

exports.create = (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.price) {
    res.status(400).send({
      message: "name or price can not be empty!"
    });
    return;
  }
  // Create a Product
  const product = {
    name: req.body.name,
    price: req.body.price,
  };

  // Save Product in the database
  Products.create(product)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Product."
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Products.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Product was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Product with id=${id}. Maybe Product was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Product with id=" + id
      });
    });
};