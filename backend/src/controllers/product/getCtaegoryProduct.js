import { Product } from "../../models/product.model.js";

const categoryProductController = async (req, res)=> {
    try {
        const productCategory = await Product.distinct("category")
        console.log("category", productCategory)

        //array to store one product fromeach array
        const productByCategory = []

        for(const category of productCategory){
            const product = await Product.findOne({category});

            if(product){
                productByCategory.push(product)
            }
        }

        res.status(200).json({
            message: "category product",
            data: productByCategory,
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


export default categoryProductController;