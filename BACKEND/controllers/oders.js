const Order = require("../models/ordersmodel.js");
const mongoose = require('mongoose');

// Create Order using COD
const createOrder = async (req, res) => {
    try {
        console.log("Request body:", req.body);
        const { items, amount, address } = req.body;
        const { userId } = req.body;

        if (!items || !amount || !address || !userId) {
            console.log("Missing required fields");
            return res.status(400).json({
                success: false,
                message: "User ID, items, amount, and address are required",
            });
        }

        const newOrder = new Order({
            userId,
            items,
            amount,
            address,
            paymentmethod: "COD",
            payment: false,
            Date: Date.now(),
        });
        await newOrder.save();

        console.log("Order created successfully:", newOrder);

        res.status(201).json({
            success: true,
            message: "Order created successfully",
            order: newOrder,
        });
    } catch (error) {
        console.error("Error in createOrder:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};


// Update Order Status
const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;

        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return res.status(400).json({ success: false, message: "Invalid orderId" });
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        res.status(200).json({
            success: true,
            message: "Order status updated successfully",
            order: updatedOrder,
        });
    } catch (error) {
        console.error("Error in updateOrderStatus:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

// List All Orders
const listOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            message: "Orders retrieved successfully",
            orders,
        });
    } catch (error) {
        console.error("Error in listOrders:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

// Get User Orders
const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ success: false, message: "User not authenticated" });
        }

        const userOrders = await Order.find({ userId }).sort({ createdAt: -1 });
        if (!userOrders.length) {
            return res.status(404).json({
                success: false,
                message: "No orders found for this user.",
            });
        }

        res.status(200).json({
            success: true,
            orders: userOrders,
        });
    } catch (error) {
        console.error("Error in getUserOrders:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

// Delete Order
const deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return res.status(400).json({ success: false, message: "Invalid orderId" });
        }

        const deletedOrder = await Order.findByIdAndDelete(orderId);
        if (!deletedOrder) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        res.status(200).json({ success: true, message: "Order deleted successfully" });
    } catch (error) {
        console.error("Error in deleteOrder:", error.message);
        res.status(500).json({
            success: false,
            message: process.env.NODE_ENV === "development" ? error.message : "Internal Server Error",
        });
    }
};

module.exports = { createOrder, updateOrderStatus, listOrders, getUserOrders, deleteOrder };
