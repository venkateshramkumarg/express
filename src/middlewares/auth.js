const jwt = require('jsonwebtoken')
const User = require('../models/user')

const userAuth = async (req,res,next)=> {

    try {
        const { token } = req.cookies;
        console.log(token);
        if(!token) {
            throw new Error("Unauthorized");
        }

        const decoded = jwt.verify(token, "1234567890");
        const user = await User.findById(decoded.userId);

        if(!user) {
            throw new Error("User not found");
        }
        req.user = user;
        next();

    }
    catch (error) {

        res.status(500).json({message: error.message})
    }
}

module.exports = {
    userAuth
}