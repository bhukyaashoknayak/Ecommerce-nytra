const usermodel = require('../models/usermodel.js');
const validation = require('validator')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const Generatetoken = async (id) => {
    return jwt.sign({ id }, process.env.JWT_TOKEN, { expiresIn: '1h' });
}

const userlogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await usermodel.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User does not exists" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = await Generatetoken(user._id);
            res.json({ success: true, token });
        } else {
            return res.status(400).json({ success: false, message: "Password does not matches" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const userregister = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const user = await usermodel.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        if (!validation.isEmail(email)) {
            return res.json({ success: false, message: "provide the valid email address" });
        }

        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Password must be at least 8 characters long" });
        }

        // hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password, salt);

        const newUser = new usermodel({
            username,
            email,
            password: hashpassword
        })
        await newUser.save();

        //token 
        const token = await Generatetoken(newUser._id);
        console.log(token);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            token,
            user: {
                username: newUser.username,
                email: newUser.email
            }
        });

    } catch (error) {
        console.log(error);
        res.json({ message: error.message });
    }
}

const adminlogin = async (req, res) => {
    try {

        const { email, password } = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_TOKEN);
            res.status(200).json({ success: true, token });
        } else {
            res.status(500).json({ message: "Invalid Details" });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: "Invalid Details" });
    }
}

module.exports = { userlogin, userregister, adminlogin };
