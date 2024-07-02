const userLogout = async (req, res)=> {
    try {
        res.clearCookie("token")
        res.json({
            message: "Logged out Sucessfully",
            error: false,
            success: true,
            data: []

        })
    } catch (err) {
        err.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}


export default userLogout;