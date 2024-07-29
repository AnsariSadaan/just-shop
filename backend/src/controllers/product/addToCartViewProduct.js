import { Cart } from "../../models/cart.model.js";

const addToCartViewProductController = async (req, res) => {
    try {
        const currentUser = req.userId
        const allProduct = await Cart.find({ userId: currentUser }).populate('productId')

        res.json({
            data: allProduct,
            success: true,
            error: false
        })

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

export default addToCartViewProductController