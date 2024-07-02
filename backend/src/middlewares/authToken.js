import jwt from 'jsonwebtoken';
const authToken = async (req, res, next) => {
    try {
        const token = req.cookies?.token;
        if(!token){
            return res.json({
                message: "User not Logged In",
                error: true,
                success: false
            })
        }

        jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
            console.log(err)
            console.log("decode", decoded);
            if(err){
                console.log("error auth", err)
            }
            req.userId = decoded?._id
            next();
        })

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            data: [],
            error: true,
            success: false
        })
    }
}

export default authToken;