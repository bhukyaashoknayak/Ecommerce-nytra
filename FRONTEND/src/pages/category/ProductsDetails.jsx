import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const ProductsDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchProduct = async () => {
        try {
            const response = await axios.post('https://ecommerce-nytra-backend2.onrender.com' + '/api/products/productinfo', { id });
            setProduct(response.data.product);
        } catch (error) {
            toast.error(error.response ? error.response.data.message : 'Error fetching products');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const handleAddToCart = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error("You must be logged in to add items to your cart.");
                return;
            }

            const response = await axios.post(
                'https://ecommerce-nytra-backend2.onrender.com'+'/api/cart/add',
                { productId: product._id, quantity: 1 },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.success) {
                toast.success("Product added to cart!");
                navigate('/cart');
            }
        } catch (error) {
            toast.error(error.response ? error.response.data.message : 'Error adding product to cart');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!product) {
        return <div>Product not found.</div>;
    }

    return (
        <div className="mt-16">
            <div className="relative">
                <video
                    className="w-full h-96 object-cover rounded-lg"
                    src="https://videos.pexels.com/video-files/5699539/5699539-uhd_2560_1440_24fps.mp4"
                    autoPlay
                    loop
                    muted
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                    <h2 className="text-2xl font-bold text-white text-center">Exclusive Deals Just for You!</h2>
                </div>
            </div>
            <div className="container mx-auto mt-20 mb-20 p-6 max-w-4xl">
                <div className="flex flex-col md:flex-row items-center">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full md:w-1/2 rounded-lg shadow-lg object-cover"
                    />
                    <div className="md:ml-8 mt-4 md:mt-0">
                        <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
                        <p className="text-gray-700 mb-4">{product.description}</p>
                        <p className="text-lg font-semibold mb-4">Price: ₹ {product.price}</p>
                        <button
                            onClick={handleAddToCart}
                            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-5 h-5 mr-2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 3h18l-2 10H5L3 3zm1 14a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm10 0a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"
                                />
                            </svg>
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductsDetails;
