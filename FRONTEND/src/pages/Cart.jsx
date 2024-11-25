import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BACKENDURL } from '../../../ADMIN/src/App';
import { FaTrashAlt } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getCartData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(BACKENDURL + '/api/cart/getdetails', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCartItems(response.data.cart);
            } catch (error) {
                console.error("Error fetching cart:", error);
            } finally {
                setLoading(false);
            }
        };

        getCartData();
    }, []);

    console.log(cartItems);
    const increaseQuantity = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const item = cartItems.find((item) => item.productId._id === id);
            if (item) {
                const newQuantity = item.quantity + 1;
                const response = await axios.post(
                    `${BACKENDURL}/api/cart/update/${id}`,
                    { quantity: newQuantity },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setCartItems((prevItems) =>
                    prevItems.map((item) =>
                        item.productId._id === id
                            ? { ...item, quantity: newQuantity }
                            : item
                    )
                );
            }
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    };

    const decreaseQuantity = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const item = cartItems.find((item) => item.productId._id === id);
            if (item && item.quantity > 1) {
                const newQuantity = item.quantity - 1;
                const response = await axios.post(
                    `${BACKENDURL}/api/cart/update/${id}`,
                    { quantity: newQuantity },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setCartItems((prevItems) =>
                    prevItems.map((item) =>
                        item.productId._id === id
                            ? { ...item, quantity: newQuantity }
                            : item
                    )
                );
            }
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    };

    const removeItem = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(
                `${BACKENDURL}/api/cart/remove/${id}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setCartItems((prevItems) => prevItems.filter((item) => item.productId._id !== id));
        } catch (error) {
            console.error("Error in removing item:", error);
        }
    };

    const calculateTotal = () => {
        return cartItems.reduce(
            (total, item) => total + item.productId.price * item.quantity,
            0
        );
    };

    if (loading) {
        return <p className="text-center">Loading...</p>;
    }

    return (
        <div className="max-w-4xl mx-auto p-4 mt-24">
            <h1 className="text-2xl font-bold mb-8 text-center">Shopping Cart</h1>
            {cartItems.length > 0 ? (
                <div>
                    <div className="overflow-x-auto shadow-md">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b">
                                    <th className="p-4">Image</th>
                                    <th className="p-4">Item</th>
                                    <th className="p-4">Price</th>
                                    <th className="p-4">Quantity</th>
                                    <th className="p-4">Total</th>
                                    <th className="p-4">Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item) => (
                                    <tr key={item.productId._id} className="border-b">
                                        {console.log(item.productId)}
                                        <td className="p-4">
                                            <img
                                                src={item.productId.image}
                                                alt={item.productId.name}
                                                className="h-16 w-16 object-cover rounded"
                                            />
                                        </td>
                                        <td className="p-4">{item.productId.name}</td>
                                        <td className="p-4">${item.productId.price.toFixed(2)}</td>
                                        <td className="p-4 flex items-center space-x-2">
                                            <button
                                                onClick={() => decreaseQuantity(item.productId._id)}
                                                className="text-gray-500 hover:text-gray-700 px-2 py-1 border rounded"
                                            >
                                                -
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button
                                                onClick={() => increaseQuantity(item.productId._id)}
                                                className="text-gray-500 hover:text-gray-700 px-2 py-1 border rounded"
                                            >
                                                +
                                            </button>
                                        </td>
                                        <td className="p-4">
                                            ₹ {(item.productId.price * item.quantity).toFixed(2)}
                                        </td>
                                        <td className="p-4">
                                            <button
                                                onClick={() => removeItem(item.productId._id)}
                                                className="shadow-lg rounded-lg border-2 p-2"
                                            >
                                                <FaTrashAlt
                                                    className="text-black hover:text-red-600"
                                                    size={20}
                                                />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-10 mb-10 text-right">
                        <h2 className="text-xl font-bold mr-3">
                            Total: ₹ {calculateTotal().toFixed(2)}
                        </h2>
                        <NavLink to="/checkout" state={{ cartItems }}>
                            <button className="mt-2 px-12 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600">
                                Checkout
                            </button>
                        </NavLink>
                        {console.log(cartItems)}
                    </div>
                </div>
            ) : (
                <p className="text-center text-gray-500">Your cart is empty.</p>
            )}
        </div>
    );
};

export default Cart;
