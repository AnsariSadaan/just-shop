import mongoose from "mongoose"; 

const addToCart = new mongoose.Schema({
    productId: String,
    quantity: Number,
    userId: String,
}, { timestamps: true })


export const Cart = mongoose.model("addToCart", addToCart);