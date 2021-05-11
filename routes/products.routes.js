const productsController = require('../controllers').products;

var router = require("express").Router();
router.get('/api/products', productsController.findAll);
router.get('/api/product/:id', productsController.findOne);
router.post('/api/product', productsController.create);
router.put('/api/product/:id', productsController.update);

module.exports = router;