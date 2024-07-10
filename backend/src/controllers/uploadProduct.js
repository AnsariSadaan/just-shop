import uploadProductPermission from "../helper/Permission.js";
import { Product } from "../models/product.model.js";

const uploadProductController = async (req, res) => {
    try {
        const sessionUserId = req.userId
        if(!uploadProductPermission(sessionUserId)){
            throw new Error("Permission Denied")
        }
        const uploadProduct = new Product(req.body)
        const saveProduct = await uploadProduct.save()
        res.status(201).json({
            message: "Product created successfully",
            error: false,
            success: true,
            data: saveProduct
        })

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

export default uploadProductController;