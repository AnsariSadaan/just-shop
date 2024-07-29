import { Cart } from "../../models/cart.model.js";

const updateAddToCartController = async (req, res) => {
    try {
        const currentUserId = req.userId;
        const addToCartProductId = req?.body?._id
        const qty = req.body.quantity;
        const updateProduct = await Cart.updateOne({ _id : addToCartProductId},{ 
            ...(qty && { quantity: qty })
        })

        res.json({
            message: "Product Updated",
            data: updateProduct,
            error: false,
            success: true
        })

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

export default updateAddToCartController