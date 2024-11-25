const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '').trim();
    console.log(token);
    if (!token) {
        return res.status(500).json({ success: false, message: "Not Authorized" });
    }

    try {
        const decode_token = jwt.verify(token, process.env.JWT_TOKEN);
        req.body.userId = decode_token.id;
        next()
    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = auth;