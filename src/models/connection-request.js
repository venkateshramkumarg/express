const mongoose = require('mongoose');

const connectionRequestSchema = mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    status: {
        type: String,
        enum: {
            values: ["interested", "ignored"],
            message: '{VALUE} is not a valid status'
        }
    }
},
    {
        timestamps: true
    }
)

connectionRequestSchema.pre("save", async function () {
    const connectionRequest = this;

    if(connectionRequest.senderId.equals(connectionRequest.receiverId)) {
        throw new Error("You cannot send a connection request to yourself");
    }
})

const ConnectionRequest = mongoose.model("ConnectionRequest", connectionRequestSchema);

module.exports = ConnectionRequest;