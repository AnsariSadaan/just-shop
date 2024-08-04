import { Product } from "../../models/product.model.js"

const filterProductController = async (req, res)=> {
    try {
        const categoryList = req?.body?.category || []
        const product = await Product.find({
            category : {
                "$in": categoryList
            }
        })

        res.json({
            data: product,
            message: "product",
            error: false,
            succes: true
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

export default filterProductController