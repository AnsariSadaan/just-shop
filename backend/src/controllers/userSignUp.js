import { User } from "../models/user.model.js";
import bcryptjs from 'bcryptjs';

const userSignUpController = async (req, res)=> {
    try{
        const {name, email, password} = req.body;
        // console.log("req.body", req.body);

        if(!name){
            return res.status(422).json({ error: "SignUp:- Please provide your name" });
            // throw new Error("please add name")
            
        }
        if(!email){
            return res.status(422).json({ error: "SignUp:- Please provide your email" });
            // throw new Error("please add email")
        }
        if(!password){
            return res.status(422).json({ error: "SignUp:- Please provide your password" });
            // throw new Error("please add password");
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(409).json({error: "Already User Exist"})
        }

        const salt = bcryptjs.genSaltSync(10);
        const hashPassword = bcryptjs.hashSync(password, salt);
        if(!hashPassword){
            // throw new Error("Something is wrong");
            res.status(500).json({error: "Something is wrong"});
        }
        const payload = {
            ...req.body,
            role: "GENERAL",
            password : hashPassword
        }
        const userData = new User(payload);
        const saveUser = await userData.save()
        res.status(200).json({
            data: saveUser,
            success: true,
            error: false,
            message: "User Created Successfully"
        })
    }catch(err){
        res.status(500).json({
            messgae: err.message || err,
            error: true,
            success: false,
        })
    }
}

export default userSignUpController;