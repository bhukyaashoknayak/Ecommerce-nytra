import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BACKENDURL } from '../../../ADMIN/src/App';
console.log(BACKENDURL);

const Deals = () => {
    const navigate = useNavigate();
    const [product, setproduct] = useState([]);

    const getproductdata = async () => {
        try {
            const response = await axios.get(BACKENDURL + '/api/products/productlist');
            setproduct(response.data.products);
            // console.log(response.data.products);
        } catch (error) {
            toast.error(error.response ? error.response.data.message : 'Error fetching products');
        }
    };

    useEffect(() => {
        getproductdata();
    }, []);

    return (
        <section className="py-12 bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Deals of the Day</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {product.map((deal) => (
                        deal.deals === true && (
                            <div
                                key={deal._id}
                                className="bg-white shadow-lg rounded-lg overflow-hidden group relative"
                            >
                                <div className="relative">
                                    <img
                                        src={deal.image}
                                        alt={deal.name}
                                        className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute top-1 left-1 bg-red-500 text-white p-1 rounded">
                                        20% OFF
                                    </div>
                                    <NavLink
                                        to={`/product/${deal._id}`}
                                        className="absolute top-2 right-2 bg-blue-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="w-5 h-5"
                                        >
                                            <path d="M3 3h2l.338 2.016L7.683 14H19l1.961-9H5.337l-.338-2H3zm7 16a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm6 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" />
                                        </svg>
                                    </NavLink>
                                </div>
                                <div className="p-4 text-center">
                                    <h3 className="text-lg font-semibold text-gray-800">{deal.name}</h3>
                                    <p className="text-gray-700 mb-1">
                                        {deal.description.split(' ').length > 4
                                            ? deal.description.split(' ').slice(0, 4).join(' ') + '...'
                                            : deal.description}
                                    </p>
                                    <p className="text-gray-600 line-through">₹1500</p>
                                    <p className="text-gray-900">₹ {deal.price}</p>
                                    <button className="mt-2 bg-blue-700 text-white px-4 py-2 rounded transition duration-300 hover:bg-blue-600" onClick={() => navigate(`/product/${deal._id}`)}>
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                        )
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Deals;
