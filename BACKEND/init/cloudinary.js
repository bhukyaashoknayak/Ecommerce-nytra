const cloudinary = require('cloudinary').v2

const connectcloudinary = async () => {

    cloudinary.config({
        // secure: true
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET_KEY
    });
}

module.exports = connectcloudinary;