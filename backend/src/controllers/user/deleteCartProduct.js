import { Cart } from "../../models/cart.model.js";

const deleteCartProductController = async (req, res)=> {
    try {
        const currentUserId = req.userId;
        const addToCartProductId = req?.body?._id
        const deleteProduct = await Cart.deleteOne({_id : addToCartProductId})
        res.json({
            message: "Prdouct Deleted from Cart",
            error: false,
            success: true,
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

// import { Cart } from "../../models/cart.model.js";

// const deleteCartProductController = async (req, res) => {
//     try {
//         const currentUserId = req.userId;
//         const addToCartProductId = req?.body?._id;

//         // Ensure that the product being deleted belongs to the current user
//         const deleteProduct = await Cart.deleteOne({ _id: addToCartProductId, userId: currentUserId });

//         if (deleteProduct.deletedCount === 0) {
//             return res.status(404).json({
//                 message: "Product not found or you don't have permission to delete it",
//                 error: true,
//                 success: false
//             });
//         }

//         res.json({
//             message: "Product Deleted from Cart",
//             error: false,
//             success: true
//         });
//     } catch (err) {
//         res.status(400).json({
//             message: err?.message || err,
//             error: true,
//             success: false
//         });
//     }
// }

// export default deleteCartProductController;
