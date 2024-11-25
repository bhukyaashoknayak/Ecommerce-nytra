import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios';
import { BACKENDURL } from '../../../ADMIN/src/App';
import { useLocation, useNavigate } from 'react-router-dom';

const CheckOut = () => {
    const { state } = useLocation();
    const cartItems = state?.cartItems || [];

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        city: "",
        state: "",
        zip: "",
    });

    const navigate = useNavigate(); // Hook to navigate to a different page

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            // Calculate total amount
            const amount = cartItems.reduce((total, item) => total + item.productId.price * item.quantity, 0);

            const address = {
                street: formData.address,
                city: formData.city,
                state: formData.state,
                zip: formData.zip
            };

            const orderItems = cartItems.map(item => ({
                productId: item.productId._id,
                name: item.productId.name,
                image: item.productId.image,
                quantity: item.quantity,
                price: item.productId.price,
                totalPrice: item.productId.price * item.quantity
            }));

            const response = await axios.post(
                `${BACKENDURL}/api/orders/paymentcod`,
                { items: orderItems, amount, address },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data.success) {
                // Navigate immediately after order is placed successfully
                navigate('/orders');
            } else {
                toast.error("Failed to place order.");
            }
        } catch (error) {
            console.error("Error in order submission:", error);
            toast.error("Server error. Please try again later.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                    <h1 className="text-2xl font-bold mb-6 text-center">Checkout</h1>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <h2 className="text-xl font-semibold mb-2">Shipping Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Full Name"
                                    className="input-field"
                                />

                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email Address"
                                    className="input-field"
                                />
                            </div>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Address"
                                className="input-field mt-4"
                            />

                            <div className="grid grid-cols-3 gap-4 mt-4">
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    placeholder="City"
                                    className="input-field"
                                />

                                <input
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    placeholder="State"
                                    className="input-field"
                                />

                                <input
                                    type="text"
                                    name="zip"
                                    value={formData.zip}
                                    onChange={handleChange}
                                    placeholder="ZIP Code"
                                    className="input-field"
                                />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold mb-2">Payment Method</h2>
                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="cod"
                                    checked
                                    disabled
                                    className="mr-2"
                                />
                                <span>Cash on Delivery</span>
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                            Place Order
                        </button>
                    </form>
                </div>
                <div className="w-full md:w-1/3">
                    <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
                    <div className="space-y-4">
                        {cartItems.map((item) => (
                            <div key={item.productId._id} className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <img
                                        src={item.productId.image}
                                        alt={item.productId.name}
                                        className="w-16 h-16 object-cover"
                                    />
                                    <span>{item.productId.name} x{item.quantity}</span>
                                </div>
                                <span>
                                    ${(item.productId.price * item.quantity).toFixed(2)}
                                </span>
                            </div>
                        ))}
                        <hr className="my-4" />
                        <div className="flex justify-between font-semibold">
                            <span>Total</span>
                            <span>${cartItems.reduce((total, item) => total + item.productId.price * item.quantity, 0).toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckOut;
