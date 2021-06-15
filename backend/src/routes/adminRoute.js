const express = require('express');
const router = express.Router();
const middleWares = require('../middleWares');
const adminController = require('../controllers/adminController');

router.put('/adminProfile', middleWares.checkAuthentication, adminController.uploadAdminProfile);
router.get('/adminProfile', middleWares.checkAuthentication, adminController.getAdminProfile);


module.exports = router;
