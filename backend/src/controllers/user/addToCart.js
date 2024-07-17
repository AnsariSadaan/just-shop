import { Cart } from "../../models/cart.model.js";

const addToCartController = async (req, res) => {
    try {
        const { productId } = req.body;
        const currentUser = req.userId;
        const isProductAvailable = await Cart.findOne({ productId, userId:currentUser })
        console.log("isProductAvailable " , isProductAvailable);
        if (isProductAvailable) {
            return res.json({
                message: "Already Exists in Cart",
                success: false,
                error: true
            })
        }
        const payload = {
            productId: productId,
            quantity: 1,
            userId: currentUser
        }
        const newAddToCart = new Cart(payload)
        const saveProduct = await newAddToCart.save();
        return res.json({
            data: saveProduct,
            message: "Product added to Cart",
            success: true,
            error: false,
        })

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

export default addToCartController