const express = require('express');
const cartRouter = express.Router();
const { addcart, updatecart, getusercart, removeCartItem } = require('../controllers/cart');
const auth = require('../middleware/auth.js')


cartRouter.post('/add', auth, addcart);
cartRouter.post('/update/:productId', auth, updatecart);
cartRouter.get('/getdetails', auth, getusercart);
cartRouter.post('/remove/:productId', auth, removeCartItem);

module.exports = cartRouter;
