const TotalDiscountsController = require('../controllers').totalDiscounts;

var router = require("express").Router();
router.get('/api/total_discounts', TotalDiscountsController.findAll);
router.get('/api/total_discount/:id', TotalDiscountsController.findOne);
router.post('/api/total_discount', TotalDiscountsController.create);
router.put('/api/total_discount/:id', TotalDiscountsController.update);

module.exports = router;