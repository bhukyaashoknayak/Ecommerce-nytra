const express = require('express');
const ProductRouter = express.Router();
const { addproduct, removeproduct, productlist, singleproduct } = require('../controllers/products.js');
const upload = require('../middleware/multer.js');
const adminAuth = require('../middleware/adminAuth.js');


ProductRouter.post('/addproduct', adminAuth, upload.single('image1'), addproduct);
ProductRouter.post('/removeproduct', adminAuth, removeproduct);
ProductRouter.get('/productlist', productlist);
ProductRouter.post('/productinfo', singleproduct);

module.exports = ProductRouter;
