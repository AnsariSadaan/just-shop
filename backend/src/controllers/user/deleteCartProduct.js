import { Cart } from "../../models/cart.model.js";

const deleteCartProductController = async (req, res)=> {
    try {
        const currentUserId = req.userId;
        const addToCartProductId = req?.body?._id
        const deleteProduct = await Cart.deleteOne({_id : addToCartProductId})
        res.json({
            data, deleteProduct,
            message: "Prdouct Deleted from Cart",
            error: false,
            success: true
        })
    } catch (err) {
        res.status(400).json({
            message: err?.message || err,
            error: true,
            success: false
        })
    }
}

export default deleteCartProductController;