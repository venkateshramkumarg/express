const mongoose = require('mongoose')

const connectionRequestSchema = mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    status: {
      type: String,
      enum: {
        values: ['interested', 'ignored'],
        message: '{VALUE} is not a valid status',
      },
    },
  },
  { timestamps: true }
)

connectionRequestSchema.pre('save', async function () {
  if (this.senderId.equals(this.receiverId)) {
    throw new Error('You cannot send a connection request to yourself')
  }
})

const ConnectionRequest = mongoose.model('ConnectionRequest', connectionRequestSchema)
module.exports = ConnectionRequest
