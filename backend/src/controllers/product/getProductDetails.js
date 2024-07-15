import { Product } from "../../models/product.model.js";

const getProductDetailsController = async (req, res)=> {
    try {
        const {productId} = req.body;
        const product = await Product.findById(productId)
        res.status(200).json({
            data: product,
            message: "Ok",
            success: true,
            error: false  
        })
    } catch (err) {
        res.status(400).json({
            message: err?.message || err,
            error: true,
            success: false
        })
    }
}

export default getProductDetailsController;