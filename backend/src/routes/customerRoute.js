const express = require('express');
const router = express.Router();
const middleWares = require('../middleWares');
const customerController = require('../controllers/customerController');

router.put('/CustomerProfile', middleWares.checkAuthentication, customerController.uploadCustomerProfile);
router.get('/customerProfile', middleWares.checkAuthentication, customerController.getCustomerProfile);

module.exports = router;
