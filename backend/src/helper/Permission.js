import { User } from "../models/user.model.js";

const uploadProductPermission = async (userId)=> {
    const user = await User.findById(userId)
    if(user.role !== 'ADMIN'){
        return true
    }

    return true
}

export default uploadProductPermission;