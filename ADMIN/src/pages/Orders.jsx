import axios from "axios";
import React, { useEffect, useState } from "react";
import { BACKENDURL } from "../App";
import { toast } from 'react-toastify';


const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getOrders = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    toast.error("You need to be logged in as an admin.");
                    return;
                }

                const response = await axios.get(`${BACKENDURL}/api/orders/orderlist`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data.success) {
                    setOrders(response.data.orders);
                } else {
                    toast.error("Failed to fetch orders.");
                }
            } catch (error) {
                console.error("Error fetching orders:", error);
                toast.error("Failed to fetch orders. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        getOrders();
    }, []);

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                `${BACKENDURL}/api/orders/orderstatus`,
                { orderId, status: newStatus },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.success) {
                toast.success("Order status updated successfully.");
                // alert("Order status updated successfully")
                setOrders((prevOrders) =>
                    prevOrders.map((order) =>
                        order._id === orderId ? { ...order, status: newStatus } : order
                    )
                );
            } else {
                toast.error("Failed to update order status.");
            }
        } catch (error) {
            console.error("Error updating order status:", error);
            toast.error("An error occurred while updating the order status.");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <div className="spinner-border" role="status"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-semibold mb-6">All Orders</h1>
            <div className="space-y-6">
                {orders.length === 0 ? (
                    <div className="text-center text-xl">No orders found.</div>
                ) : (
                    orders.map((order) => (
                        <div key={order._id} className="bg-white p-6 rounded-lg shadow-md">
                            <p className="mb-2">
                                <strong>Status:</strong>
                                <select
                                    value={order.status}
                                    onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                                    className="ml-2 border p-1 rounded"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Processing">Processing</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </p>
                            <p className="mb-2">
                                <strong>User:</strong> {order.userId.name}
                            </p>
                            <p className="mb-2">
                                <strong>Payment Method:</strong> {order.paymentmethod}
                            </p>
                            <p className="mb-2">
                                <strong>Shipping Address:</strong> {order.address.street},{" "}
                                {order.address.city}, {order.address.state}, {order.address.zip}
                            </p>
                            <p>
                                <strong>Date:</strong>{" "}
                                {new Intl.DateTimeFormat("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                }).format(new Date(order.Date))}
                            </p>

                            <div>
                                <strong>Items:</strong>
                                <ul className="list-disc ml-6 mt-3">
                                    {order.items.map((item) => (
                                        <li key={item.productId} className="mb-2 flex items-center">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-12 h-12 mr-4 rounded"
                                            />
                                            <span>
                                                {item.name} x {item.quantity} - $
                                                {(item.price * item.quantity).toFixed(2)}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-4 flex ml-2">
                                <strong>Total Amount:</strong>
                                <span className="font-semibold ml-2">₹ {order.amount}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Orders;
