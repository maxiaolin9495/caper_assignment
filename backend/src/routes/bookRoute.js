const express = require('express');
const router = express.Router();
const middleWares = require('../middleWares');
const bookController = require('../controllers/bookController');

router.post('/book', middleWares.checkAuthentication, bookController.addBook);
//it was not that nice, but due to the IO constraints, the delete request can only come 6 in a short time, the others will be easily ignored.
router.post('/deleteBooks', middleWares.checkAuthentication,bookController.deleteBooks);
router.put('/:bookId', middleWares.checkAuthentication, bookController.editBook);
router.get('/getAllBooks', middleWares.checkAuthentication, bookController.getAllBooks);
router.get('/search', middleWares.checkAuthentication, bookController.searchBook);
router.get('/autoComplete', bookController.autoCompleteForSearch);

module.exports = router;
