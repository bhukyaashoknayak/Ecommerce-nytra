const jwt = require('jsonwebtoken');

const adminAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '').trim();
        if (!token) {
            return res.status(500).json({ message: "Not Authorized" });
        }

        const decode_token = jwt.verify(token, process.env.JWT_TOKEN);
        if (decode_token !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.status(500).json({ message: "Invalid" });
        }
        next()

    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({ message: "Invalid Details" });
    }
}

module.exports = adminAuth;