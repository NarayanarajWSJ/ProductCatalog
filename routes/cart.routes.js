const CartController = require('../controllers').cart;

var router = require("express").Router();
router.get('/api/carts', CartController.findAll);
router.get('/api/cart/:id', CartController.findOne);
router.post('/api/cart', CartController.create);
router.post('/api/checkout', CartController.checkout);
router.post('/api/clear_cart', CartController.clearCart);

module.exports = router;