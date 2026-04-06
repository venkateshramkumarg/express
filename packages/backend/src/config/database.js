const mongoose = require('mongoose')

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://venky_db_user:LCONBidHUBcXb7B4@cluster0.cup65xg.mongodb.net/devTinder')
}

module.exports = connectDB
