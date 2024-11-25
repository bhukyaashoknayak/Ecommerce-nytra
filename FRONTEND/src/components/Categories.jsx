import React from 'react';
import { NavLink } from 'react-router-dom';
import '../index.css'

const Categories = () => {
    const categories = [
        { id: 1, name: 'Electronics', image: 'https://images.pexels.com/photos/3973978/pexels-photo-3973978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: 2, name: 'Fashion', image: 'https://images.pexels.com/photos/3764561/pexels-photo-3764561.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: 3, name: 'HomeDecor', image: 'https://images.pexels.com/photos/6236189/pexels-photo-6236189.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: 4, name: 'Books', image: 'https://images.pexels.com/photos/3661473/pexels-photo-3661473.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: 5, name: 'Sports', image: 'https://images.pexels.com/photos/13464775/pexels-photo-13464775.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', },
        { id: 6, name: 'Beauty', image: 'https://images.pexels.com/photos/4620873/pexels-photo-4620873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', }
    ];

    return (
        <section className="bg-gray-100 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
                    Shop by Categories
                </h2>
                <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
                    {categories.map((category) => (
                        <NavLink
                            key={category.id}
                            to={`/category/${category.name}`}
                            className="block overflow-hidden rounded-lg shadow-lg bg-white w-[300px] flex-shrink-0"
                        >
                            <div className="relative w-full h-36">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-65 flex flex-col items-center justify-center p-4">
                                    <h3 className="text-xl font-semibold text-white">
                                        {category.name}
                                    </h3>
                                    <button className="mt-4 bg-blue-600 text-white px-3 py-2 rounded">
                                        Shop Now
                                    </button>
                                </div>
                            </div>
                        </NavLink>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Categories;
