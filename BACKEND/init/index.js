const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    const dbURI = process.env.MONGODB_URL;

    if (!dbURI) {
        console.error('MONGODB_URL is not defined in the .env file!');
        return;
    }

    try {
        await mongoose.connect(dbURI);
        console.log("Database connected successfully");
    } catch (err) {
        console.error("Database connection error:", err);
    }
}

module.exports = connectDB;

