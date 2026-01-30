const express = require('express');
const { userAuth } = require('../middlewares/auth');
const { validateProfileUpdate } = require('../utils/validation');
const ProfileRouter = express.Router();

ProfileRouter.get('/profile', userAuth, async (req,res)=> {
    try {

        const user = req.user;

        res.status(200).json({user})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

ProfileRouter.patch("/profile", userAuth, async (req, res) => {

    try {
        validateProfileUpdate(req.body);

        const user = req.user;

        Object.keys(req.body).forEach(key => user[key] = req.body[key]);
        await user.save();
        res.status(200).json({message: "Profile updated successfully", user})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

ProfileRouter.patch("/profile/password", userAuth, async (req, res) => {
    try {
        validatePasswordUpdate(req.body);
        
        const { currentPassword, newPassword } = req.body;
        const user = req.user;

        const isValidPassword = await user.validatePassword(currentPassword);

        if(!isValidPassword) {
            throw new Error("Invalid current password")
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;
        await user.save();

        return res.status(200).json({message: "Password updated successfully"})
    }
    catch (error) {
        res.status(500).json({message: error.message})
    }
});

module.exports = ProfileRouter;