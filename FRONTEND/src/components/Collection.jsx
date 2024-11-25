import React from 'react';
import { NavLink } from 'react-router-dom';

const Collections = () => {
    const collections = [
        {
            id: 1,
            name: 'Women Dress',
            image: 'src/assets/card-1.png',
            description: 'Explore our trendy collection of women dresses for all occasions.',
        },
        {
            id: 2,
            name: 'Women Shirts',
            image: 'src/assets/card-2.png',
            description: 'Discover stylish women shirts for both casual and formal wear.',
        },
        {
            id: 3,
            name: 'Women Casuals',
            image: 'src/assets/card-3.png',
            description: 'Comfortable and fashionable casual outfits for women.',
        }
    ];

    return (
        <section className="bg-gray-100 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
                    Women's Collections
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {collections.map((collection) => (
                        <NavLink
                            key={collection.id}
                            to={`/collection/${collection.name}`}
                            className="relative bg-white rounded-lg shadow-lg overflow-hidden group"
                        >
                            <div className="relative h-50 sm:h-50">
                                <img
                                    src={collection.image}
                                    alt={collection.name}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <h3 className="text-xl font-semibold text-white">
                                        {collection.name}
                                    </h3>
                                    <p className="mt-2 text-white text-center">
                                        {collection.description}
                                    </p>
                                    <button className="mt-4 bg-slate-900 text-white px-4 py-2 rounded hover:bg-slate-500 transition duration-300">
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

export default Collections;
