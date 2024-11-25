const cloudinary = require('cloudinary').v2
const productschema = require('../models/productschema.js')

//Add Products
const addproduct = async (req, res) => {
    try {
        const { name, description, price, category, sizes, deals } = req.body;

        const image = req.file;
        if (!image) {
            return res.status(400).json({ message: "No image provided" });
        }

        // Parse sizes from request body
        const sizesArray = sizes && typeof sizes === 'string'
            ? sizes.split(',').map(size => size.trim())
            : [];

        const uploadedImage = await cloudinary.uploader.upload(image.path);
        const product = new productschema({
            name,
            description,
            price,
            category,
            sizes: sizesArray,
            image: uploadedImage.secure_url,
            deals: deals,
        });

        await product.save();
        res.status(200).json({ success: true, message: "Product added successfully" });
    } catch (error) {
        console.error('Error in addproduct:', error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Remove Products
const removeproduct = async (req, res) => {
    try {
        const { id } = req.body;
        const product = await productschema.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, message: "Item removed successfully" });
    } catch (error) {
        console.error('Error in removeproduct:', error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}


//List of Products
const productlist = async (req, res) => {
    try {
        const products = await productschema.find({});
        console.log(products);
        res.status(200).json({ message: "Products received successfully", products });
    } catch (error) {
        console.error('Error in products:', error);
        res.status(500).json({ message: "Server error" });
    }
}

// single product
const singleproduct = async (req, res) => {
    try {
        const { id } = req.body;
        const product = await productschema.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        console.log(product);
        res.status(200).json({ product });
    } catch (error) {
        console.error('Error in find product details:', error);
        res.status(500).json({ message: "Server error" });
    }
}


module.exports = { addproduct, removeproduct, productlist, singleproduct };
