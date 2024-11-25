const User = require('../models/usermodel');


// Add an item to the cart
const addcart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        const user = await User.findById(userId);

        if (!user) return res.status(404).json({ success: false, message: "User not found" });
        const existingItem = user.cart.find((item) => item.productId.toString() === productId);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            user.cart.push({ productId, quantity });
        }

        await user.save();
        res.status(200).json({ success: true, message: "Item added to cart", cart: user.cart });
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ success: false, message: "Failed to add item to cart" });
    }
};

// Update an item's quantity
const updatecart = async (req, res) => {
    try {
        const { productId } = req.params;
        const { quantity } = req.body;
        const userId = req.body.userId;

        const user = await User.findById(userId);
        console.log(user);
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        const cartItem = user.cart.find((item) => item.productId.toString() === productId);
        if (!cartItem) {
            return res.status(404).json({ success: false, message: "Item not found in cart" });
        }
        cartItem.quantity = quantity;
        await user.save();
        res.status(200).json({ success: true, message: "Cart updated", cart: user.cart });
    } catch (error) {
        console.error("Error updating cart:", error);
        res.status(500).json({ success: false, message: "Failed to update cart" });
    }
};


// Get the user's cart
const getusercart = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await User.findById(userId).populate('cart.productId');
        if (!user) return res.status(404).json({ success: false, message: "User not found" });
        console.log(user.cart)
        res.status(200).json({ success: true, cart: user.cart });
    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({ success: false, message: "Failed to fetch cart" });
    }
};

// Remove an item from the cart
const removeCartItem = async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.body.userId;
        const user = await User.findById(userId);

        if (!user) return res.status(404).json({ success: false, message: "User not found" });
        user.cart = user.cart.filter((item) => item.productId.toString() !== productId);
        await user.save();

        res.status(200).json({ success: true, message: "Item removed from cart", cart: user.cart });
    } catch (error) {
        console.error("Error in removing item:", error);
        res.status(500).json({ success: false, message: "Failed to remove item from cart" });
    }
};

module.exports = { addcart, updatecart, getusercart, removeCartItem };
