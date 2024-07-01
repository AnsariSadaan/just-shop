import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const userSignInController = async (req, res)=> {
    try {
        const {email, password} = req.body;
        if (!email) {
            // throw new Error("please add email")
            return res.status(422).json({ message: "Please enter email", error: true });
        }
        if (!password) {
            // throw new Error("please add password")
            return res.status(422).json({ message: "Please enter password", error: true });
        }

        const user = await User.findOne({email});
        if (!user){
            // throw new Error("User not found")
            return res.status(422).json({ message: "User not found", error: true })
        }
        const checkPassword = await bcrypt.compare(password, user.password); 
        console.log("checkPassword", checkPassword);

        if(checkPassword){
            const tokenData = {
                _id: user._id,
                email: user.email
            }
            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 5 });
            const tokenOption = {
                httpOnly : true,
                secure : true
            }
            res.cookie("token", token, tokenOption).status(200).json({
                message: "Login Successfully",
                data: token,
                success: true,
                error: false
            });
        }else  {
            // throw new Error("please check password")
            return res.status(422).json({message: "please check password", error: true});
        }

    } catch (err) {
        res.status(500).json({
            messgae: err.message || "Internal Server Error",
            error: true,
            success: false,
        })
    }
}

export default userSignInController;