import React, { useState } from "react";
import axios from "axios";
import { BACKENDURL } from '../App';
import { toast } from "react-toastify";

const ProductForm = ({ token }) => {
    const [image, setImage] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [deals, setDeals] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSizeToggle = (size) => {
        setSelectedSizes((prevSizes) =>
            prevSizes.includes(size)
                ? prevSizes.filter((item) => item !== size)
                : [...prevSizes, size]
        );
    };

    const validateForm = () => {
        if (!name || !description || !category || !price || !image) {
            toast.error("Please fill all fields and select at least one size and an image.");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('price', price);
        formData.append('sizes', selectedSizes.join(','));
        formData.append('image1', image);
        formData.append('deals', deals);

        try {
            setLoading(true);
            const response = await axios.post(BACKENDURL + '/api/products/addproduct', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            setLoading(false);

            if (response.data.success) {
                toast.success(response.data.message);
                // Reset form fields after successful submission
                setName('');
                setDescription('');
                setCategory('');
                setPrice('');
                setImage(null);
                setSelectedSizes([]);
                setDeals(false);
            } else {
                toast.error(response.data.message || "Something went wrong, please try again.");
            }
        } catch (error) {
            setLoading(false);
            console.error('Error uploading product:', error);
            toast.error("Network error, please try again later.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-cover bg-center">
            <form className="w-full max-w-3xl pl-24 pr-24 pt-6 pb-8 rounded-lg bg-white" onSubmit={handleSubmit}>
                <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-6">Add Product</h2>
                <div className="flex flex-col items-center space-y-4 mb-6">
                    <div className="w-full h-52 bg-gray-100 border border-gray-300 rounded-lg flex justify-center items-center relative">
                        <input
                            id="image1"
                            type="file"
                            className="hidden"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                        {image ? (
                            <img
                                src={URL.createObjectURL(image)}
                                alt="Product Preview"
                                className="w-full h-full object-cover rounded-lg"
                            />
                        ) : (
                            <label
                                htmlFor="image1"
                                className="absolute inset-0 flex justify-center items-center text-gray-600 font-medium cursor-pointer"
                            >
                                <span>Choose Image</span>
                            </label>
                        )}
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-lg text-gray-700 font-semibold">Product Name</label>
                    <input
                        type="text"
                        placeholder="Enter product name"
                        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-lg text-gray-700 font-semibold mt-2">Product Description</label>
                    <textarea
                        placeholder="Enter product description"
                        rows="4"
                        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-lg text-gray-700 font-semibold mb-2">Product Category</label>
                    <select
                        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Select</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Fashion">Fashion</option>
                        <option value="HomeDecor">HomeDecor</option>
                        <option value="Books">Books</option>
                        <option value="Sports">Sports</option>
                        <option value="Beauty">Beauty</option>

                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-lg text-gray-700 font-semibold">Product Price</label>
                    <input
                        type="number"
                        placeholder="Enter product price"
                        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-lg text-gray-700 font-semibold">Available Sizes</label>
                    <div className="flex flex-wrap gap-2">
                        {["S", "M", "L", "XL", "XXL"].map((size) => (
                            <button
                                key={size}
                                type="button"
                                className={`w-12 h-12 flex items-center justify-center text-lg font-semibold rounded-lg border-2 ${selectedSizes.includes(size)
                                    ? "bg-blue-600 text-white border-blue-600"
                                    : "bg-white text-gray-700 border-gray-300"
                                    }`}
                                onClick={() => handleSizeToggle(size)}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="mb-4">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            className="mr-2"
                            checked={deals}
                            onChange={(e) => setDeals(e.target.checked)}
                        />
                        <span className="text-lg text-gray-700 font-semibold">Mark as Deal</span>
                    </label>
                </div>

                <button
                    type="submit"
                    className="w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    disabled={loading}
                >
                    {loading ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
    );
};

export default ProductForm;
