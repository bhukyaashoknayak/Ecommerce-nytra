const express = require('express');
const { createOrder, updateOrderStatus, listOrders, getUserOrders, deleteOrder } = require('../controllers/oders.js')
const adminAuth = require('../middleware/adminAuth.js')
const auth = require('../middleware/auth.js')

const orderRouter = express.Router();

//Admin Router
orderRouter.get('/orderlist', adminAuth, listOrders);
orderRouter.post('/orderstatus', adminAuth, updateOrderStatus);


//Payment Method -- COD
orderRouter.post('/paymentcod', auth, createOrder);

//user Order
orderRouter.get('/userorders', auth, getUserOrders);

module.exports = orderRouter;