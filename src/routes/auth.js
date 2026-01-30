const express = require('express');
const { validateSignUpData, validateLoginData } = require('../utils/validation');
const User = require('../models/user');
const bcrypt = require('bcrypt');

const AuthRouter = express.Router();

AuthRouter.post('/signup', async (req,res) => {
    try {
        validateSignUpData(req.body)

        const { firstName, lastName, email, password } = req.body;

        const existingUser = await User.findOne({email});

        if(existingUser) {
            throw new Error("User already exists")
        }
        const hashedPasword = await bcrypt.hash(password, 10);

        const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPasword
        })
        await user.save()
        res.status(201).json({message: "User created successfully", user})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

AuthRouter.post('/login', async (req, res) => {
    try {
        validateLoginData(req.body)
        const { email, password } = req.body;

        const user = await User.findOne({email});

        if(!user) {
            throw new Error("Invalid email or password");
        }

        const isValidPassword = await user.validatePassword(password);

        if(!isValidPassword) {
            throw new Error("Invalid email or password");
        }

        const token = user.getJWT();

        res.cookie("token",token, { expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) }) // 30 days
        res.status(200).json({message: "Login successful"})

    }
    catch (error) {
        res.status(500).json({message: error.message})
    }
})

AuthRouter.post('/logout', (req, res) => {
    res.cookie("token", null, { expires: new Date(Date.now()) })
    res.status(200).json({message: "Logout successful"})
});

module.exports = AuthRouter;