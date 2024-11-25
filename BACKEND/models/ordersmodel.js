const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
});

const itemSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
});

// Orders Schema
const orderschema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: { type: [itemSchema], required: true },
    amount: { type: Number, required: true },
    address: { type: addressSchema, required: true },
    status: { type: String, required: true, default: 'order placed' },
    paymentmethod: { type: String, required: true },
    payment: { type: Boolean, required: true, default: false },
    Date: { type: Number, required: true },
});

const Order = mongoose.model('Order', orderschema);

module.exports = Order;
