import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BACKENDURL } from '../App';
import { toast } from 'react-toastify';
import { FaTrashAlt } from 'react-icons/fa';
import { CircleLoader } from 'react-spinners';


const ProductList = ({ token }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);


    const getProducts = async () => {
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
        getProducts();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <CircleLoader color="#6366F1" loading={loading} size={90} />
            </div>
        );
    }

    const deletepoduct = async (id) => {
        try {
            const response = await axios.post(BACKENDURL + '/api/products/removeproduct', { id },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                }
            );

            if (response.data.success) {
                toast.success(response.data.message);
                getProducts()
            } else {
                toast.error(response.data.message || "Something went wrong, please try again.");
            }
        } catch (error) {
            toast.error(error.response ? error.response.data.message : 'Error fetching products');
        }
    }



    return (
        <div className="flex flex-wrap justify-center">
            {products.length > 0 ? (
                products.map((item) => (
                    <div key={item._id} className="w-96 m-4 p-3 border rounded-lg shadow-md relative text-center">
                        <div className="absolute top-2 right-2 bg-white rounded-full shadow-lg p-2 cursor-pointer" onClick={() => { deletepoduct(item._id) }}>
                            <FaTrashAlt
                                className="text-black hover:text-red-600"
                                size={20}
                            />
                        </div>

                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-60 object-fill rounded-lg mb-4"
                        />
                        <h3 className="text-lg font-semibold">{item.name}</h3>
                        <p className="text-md text-gray-800">{item.description}</p>
                        <div className="text-sm font-bold text-gray-800">Category: {item.category}</div>
                        <div className="text-xl font-semibold text-blue-600">₹ {item.price}</div>
                        {item.sizes && item.sizes.length > 0 && (
                            <div>
                                <p className="text-sm text-gray-800 mb-1">Available Sizes:</p>
                                <div className="flex space-x-2 justify-center items-center">
                                    {item.sizes.map((size) => (
                                        <span
                                            key={size}
                                            className="px-3 py-1 border rounded-full text-sm text-gray-700"
                                        >
                                            {size}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                ))
            ) : (
                <div >
                    <div className="flex justify-center items-center min-h-screen">
                        <div>No products available</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductList;
