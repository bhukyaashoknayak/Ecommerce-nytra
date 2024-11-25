import React from 'react';
import { NavLink } from 'react-router-dom';

const TrendingProducts = () => {
    const trendingProducts = [
        {
            id: 1,
            name: 'Exclusive Sneakers',
            price: '₹ 149.99',
            image: 'https://images.pexels.com/photos/1599005/pexels-photo-1599005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            description: 'Get the latest trendy sneakers with exclusive designs!',
        },
    ];

    return (
        <section className="py-12 bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Trending Products</h2>
                <div className="grid grid-cols-1 gap-8">
                    {trendingProducts.map((product) => (
                        <div key={product.id} className="relative bg-white shadow-lg rounded-lg overflow-hidden">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-96 object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center p-6">
                                <h3 className="text-2xl font-bold text-white">{product.name}</h3>
                                <p className="text-white mt-2">{product.description}</p>
                                <p className="text-lg font-semibold text-white mt-2">{product.price}</p>
                                <NavLink
                                    to={`/product/${product.id}`}
                                    className="mt-4 bg-blue-700 text-white px-6 py-3 rounded hover:bg-blue-500 transition duration-300"
                                >
                                    Shop Now
                                </NavLink>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrendingProducts;
