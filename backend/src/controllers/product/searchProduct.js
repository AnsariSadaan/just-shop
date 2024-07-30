import { Product } from "../../models/product.model.js"

const searchProductController = async (req, res)=> {
    try {
        const query = req.query.q
        const regex = new RegExp(query, "i", "g")
        const product = await Product.find({
            "$or": [
                {
                    productName : regex
                },
                {
                    category : regex
                }
            ]
        })

        res.json({
            data: product,
            message: "Search product list",
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

export default searchProductController