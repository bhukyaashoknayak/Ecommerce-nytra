import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { CircleLoader } from 'react-spinners';
import { BACKENDURL } from '../../../../ADMIN/src/App';
import { toast } from 'react-toastify';

const CollectionList = () => {
    const navigate = useNavigate();
    const [productdata, setProductdata] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [Filtered, setFiltered] = useState({
        category: 'all',
        color: 'all',
    });

    const filters = {
        category: ['All', 'Electronics', 'Fashion', 'HomeDecor'],
        color: ['All', 'Black', 'Red'],
    };

    // Fetch product data from the backend
    const getproductdata = async () => {
        try {
            const response = await axios.get(BACKENDURL + '/api/products/productlist');
            setProductdata(response.data.products);
            setFilteredProducts(response.data.products);
        } catch (error) {
            toast.error(error.response ? error.response.data.message : 'Error fetching products');
        } finally {
            setLoading(false);
        }
    };

    const applyfilter = () => {
        let filteredData = [...productdata];

        // Filter by category
        if (Filtered.category !== 'All') {
            filteredData = filteredData.filter((product) => product.category === Filtered.category);
        }

        // Filter by color
        if (Filtered.color !== 'All') {
            filteredData = filteredData.filter((product) => product.color === Filtered.color);
        }

        setFilteredProducts(filteredData);
    };

    useEffect(() => {
        getproductdata();
    }, []);

    useEffect(() => {
        applyfilter();
    }, [Filtered]);

    const ClearFilter = () => {
        setFiltered({
            category: 'All',
            color: 'All',
        });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <CircleLoader color="#6366F1" loading={loading} size={90} />
            </div>
        );
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
            <div className="flex mt-16 p-4">
                <div className="w-1/5 p-4 rounded-lg border-2">
                    <h2 className="text-xl font-bold mb-4">Filters</h2>
                    <div className="mb-4">
                        <h3 className="block font-bold mb-2">Category</h3>
                        {filters.category.map((cat) => (
                            <label key={cat} className="block cursor-pointer">
                                <input
                                    type="radio"
                                    name="category"
                                    value={cat}
                                    checked={Filtered.category === cat}
                                    onChange={() =>
                                        setFiltered((prev) => ({ ...prev, category: cat }))
                                    }
                                    className="mr-2"
                                />
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </label>
                        ))}
                    </div>

                    <div className="mb-4">
                        <h3 className="block font-bold mb-2">Color</h3>
                        {filters.color.map((col) => (
                            <label key={col} className="block cursor-pointer">
                                <input
                                    type="radio"
                                    name="color"
                                    value={col}
                                    checked={Filtered.color === col}
                                    onChange={() =>
                                        setFiltered((prev) => ({ ...prev, color: col }))
                                    }
                                    className="mr-2"
                                />
                                {col.charAt(0).toUpperCase() + col.slice(1)}
                            </label>
                        ))}
                    </div>

                    <button
                        className="w-full bg-blue-600 text-white p-2 rounded mt-4 hover:bg-blue-700"
                        onClick={ClearFilter}
                    >
                        Clear Filters
                    </button>
                </div>
                <div className="w-3/4 p-4">
                    <section className="py-6">
                        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredProducts.map((product) => (
                                <div
                                    key={product._id}
                                    className="bg-white shadow-lg rounded-lg overflow-hidden group relative"
                                >
                                    <div className="relative">
                                        <NavLink to={`/product/${product._id}`}>
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-60 object-fill transform group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </NavLink>
                                    </div>
                                    <div className="p-4 text-center">
                                        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                                        <p className="text-gray-700 mb-1">
                                            {product.description.split(' ').length > 4
                                                ? product.description.split(' ').slice(0, 4).join(' ') + '...'
                                                : product.description}
                                        </p>

                                        <p className="text-gray-600">₹ {product.price}</p>
                                        <button
                                            className="mt-2 bg-blue-700 text-white px-4 py-2 rounded transition duration-300 hover:bg-blue-600"
                                            onClick={() => navigate(`/product/${product._id}`)}
                                        >
                                            Buy Now
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default CollectionList;
