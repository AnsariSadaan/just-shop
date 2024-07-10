import {User} from '../../models/user.model.js'
const AllUsers = async (req,res)=> {
    try {
        console.log('userId', req.userId)
        const allUsers = await User.find()
        res.json({
            message: "All Users",
            data: allUsers,
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


export default AllUsers;