const mongoose = require('mongoose')


const connectDB = async () => {
    mongoose.connect("mongodb+srv://venky_db_user:LCONBidHUBcXb7B4@cluster0.cup65xg.mongodb.net/devTinder")
}

module.exports = connectDB