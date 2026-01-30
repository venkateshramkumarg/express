const express = require('express');

const User = require('../models/user');
const ConnectionRequest = require('../models/connection-request');
const { validateConnectionRequest } = require('../utils/validation');
const { userAuth } = require('../middlewares/auth');

const requestRouter = express.Router();

requestRouter.post('/request/send/:status/:receiverId', userAuth, async (req, res) => {
    try {
        const { status, receiverId } = req.params;

        validateConnectionRequest({ status, receiverId });
        const senderId = req.user._id;

        const receiver = await User.findById(receiverId);

        if(!receiver) {
            throw new Error("Receiver not found")
        }

        const existingRequest = await ConnectionRequest.findOne({
            $or: [
                { senderId, receiverId },
                { senderId: receiverId, receiverId: senderId }
            ]
        })

        if(existingRequest) {
            throw new Error("Connection request already exists")
        }

        const connectionRequest = new ConnectionRequest({
            senderId,
            receiverId,
            status
        })
        await connectionRequest.save();

        res.status(201).json({message: "Connection request sent successfully", connectionRequest})
    }
    catch (error) {
        res.status(500).json({message: error.message})
    }
});

module.exports = requestRouter;