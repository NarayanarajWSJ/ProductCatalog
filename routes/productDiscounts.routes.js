const ProductDiscountsController = require('../controllers').productDiscounts;

var router = require("express").Router();
router.get('/api/product_discounts', ProductDiscountsController.findAll);
router.get('/api/product_discount/:id', ProductDiscountsController.findOne);
router.post('/api/product_discount', ProductDiscountsController.create);
router.put('/api/product_discount/:id', ProductDiscountsController.update);

module.exports = router;