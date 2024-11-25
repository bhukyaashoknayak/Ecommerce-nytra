import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { BACKENDURL } from '../../../../ADMIN/src/App';
import { toast } from 'react-toastify';

const Search = () => {
    const [products, setProducts] = useState([]);
    const [query, setQuery] = useState('');
    const [Filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);

    const getproductdata = async () => {
        try {
            const response = await axios.get(BACKENDURL + '/api/products/productlist');
            setProducts(response.data.products);
        } catch (error) {
            toast.error(error.response ? error.response.data.message : 'Error fetching products');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getproductdata();
    }, []);

    //updating the fetched products
    useEffect(() => {
        setFiltered(products);
    }, [products]);

    if (loading) {
        return <div>Loading...</div>;
    }

    const searchitem = () => {
        const queryval = query.toLowerCase();
        const filtered = products.filter(
            (product) =>
                product.category.toLowerCase().includes(queryval) ||
                product.name.toLowerCase().includes(queryval)
        );
        setFiltered(filtered);
    };

    return (
        <div className='mt-16'>
            <div className='relative'>
                <video
                    className='w-full h-96 object-cover rounded-lg'
                    src='https://videos.pexels.com/video-files/5699539/5699539-uhd_2560_1440_24fps.mp4'
                    autoPlay
                    loop
                    muted
                />
                <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg'>
                    <h2 className='text-2xl font-bold text-white text-center'>
                        Exclusive Deals Just for You!
                    </h2>
                </div>
            </div>
            <div className='flex items-center justify-center py-10'>
                <div className='flex items-center border border-gray-300 rounded-lg shadow-lg overflow-hidden transition-all duration-300 w-96'>
                    <input
                        type='text'
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder='Search the products..'
                        className='p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-l-md transition-all duration-300 w-full'
                    />
                    <button
                        onClick={searchitem}
                        className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-md'
                    >
                        Search
                    </button>
                </div>
            </div>

            <section className='p-5'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    {Filtered.length > 0 ? (
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
                            {Filtered.map((product) => (
                                <div
                                    key={product._id}
                                    className='bg-white shadow-lg rounded-lg overflow-hidden group relative'
                                >
                                    <div className='relative'>
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className='w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300'
                                        />
                                        <div className='absolute top-2 left-2 bg-red-500 text-white p-1 rounded'>
                                            20% OFF
                                        </div>
                                        <NavLink
                                            to={`/product/${product._id}`}
                                            className='absolute top-2 right-2 bg-blue-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                                        >
                                            <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                viewBox='0 0 24 24'
                                                fill='currentColor'
                                                className='w-5 h-5'
                                            >
                                                <path d='M3 3h2l.338 2.016L7.683 14H19l1.961-9H5.337l-.338-2H3zm7 16a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm6 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4z' />
                                            </svg>
                                        </NavLink>
                                    </div>
                                    <div className='p-4 text-center'>
                                        <h3 className='text-lg font-semibold text-gray-800'>
                                            {product.name}
                                        </h3>
                                        <p className="text-gray-700 mb-1">
                                            {product.description.split(' ').length > 4
                                                ? product.description.split(' ').slice(0, 3).join(' ') + '...'
                                                : product.description}
                                        </p>
                                        <p className='text-gray-600'>${product.price}</p>
                                        <button className='mt-2 bg-blue-700 text-white px-4 py-2 rounded transition duration-300 hover:bg-blue-600'>
                                            Buy Now
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className='text-center text-gray-700'>
                            No products found matching your search.
                        </p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Search;
