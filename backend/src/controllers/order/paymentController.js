import stripe from '../../db/stripe.js';
import { User } from '../../models/user.model.js';

const paymentController = async (req, res) => {
    try {
        const { cartItems } = req.body;
        console.log("cartItems", cartItems)
        const user = await User.findOne({ _id: req.userId })
        const params = {
            submit_type: 'pay',
            mode: 'payment',
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            shipping_options: [
                {
                    shopping_rate: "shr_1Q19soFCNSOSw3IZDRe46RSe"
                }
            ],
            customer_email: user.email,
            line_items: cartItems.map((item, index) => {
                return {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: item.productId.productName,
                            images: item.productId.productImage,
                            metadata: {
                                productId: item.productId._id
                            }
                        },
                        unit_amount: item.productId.sellingPrice
                    }
                }
            })
        }
        const session = await stripe.checkout.sessions.create()
        res.status(303).json(session)
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

export default paymentController