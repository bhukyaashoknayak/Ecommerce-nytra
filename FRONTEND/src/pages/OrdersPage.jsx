import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { BACKENDURL } from "../../../ADMIN/src/App";

const OrdersPage = () => {
    const [orders, setorders] = useState([]);
    const [loading, setloading] = useState(true);

    useEffect(() => {
        const getOrders = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    toast.error("You need to be logged in to view orders.");
                    return;
                }

                const response = await axios.get(`${BACKENDURL}/api/orders/userorders`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data.success) {
                    setorders(response.data.orders);
                } else {
                    toast.error("Failed to fetch orders.");
                }
            } catch (error) {
                console.error("Error fetching orders:", error);
                toast.error("Failed to fetch orders. Please try again.");
            } finally {
                setloading(false);
            }
        };

        getOrders();
    }, []);

    console.log(orders)
    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <div className="spinner-border" role="status"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-semibold mb-6">Your Orders</h1>
            <div className="space-y-6">
                {orders.length === 0 ? (
                    <div className="text-center text-xl">You have no orders yet.</div>
                ) : (
                    orders.map((order) => (
                        <div key={order._id} className="bg-white p-6 rounded-lg shadow-md">
                            <p className="mb-2">
                                <strong>Status:</strong> {order.status}
                            </p>
                            <p className="mb-2">
                                <strong>Shipping Address:</strong> {order.address.street}, {order.address.city},{order.address.state},{order.address.zip}
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
                                                {item.name} x {item.quantity} - ₹
                                                {(item.price * item.quantity).toFixed(2)}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-4 flex ml-2">
                                <strong>Total Amount:</strong>
                                <span className="font-semibold ml-2">
                                    ₹ {order.amount}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default OrdersPage;
