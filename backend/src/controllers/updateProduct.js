import uploadProductPermission from "../helper/Permission.js"
import { Product } from "../models/product.medel.js"

const updateProductController = async (req, res)=> {
    try {
        if (!uploadProductPermission(req.userId)) {
            throw new Error("Permission Denied")
        }

        const {_id, ...resBody} = req.body

        const updateProduct = await Product.findByIdAndUpdate(_id, resBody)
        res.json({
            message: "Product Updated Successfully",
            data: updateProduct,
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

export default updateProductController;