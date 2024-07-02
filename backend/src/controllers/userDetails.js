import { User } from "../models/user.model.js";
const userDetailsController = async (req, res)=> {
    try {
        console.log("userId", req.userId);
        const user = await User.findById(req.userId)
        res.status(200).json({
            data: user,
            error: false,
            success: true,
            message: "User Details"
        })
        console.log("user", user);
    } catch (err) {
        err.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

export default userDetailsController;