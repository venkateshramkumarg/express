const express = require('express')
const cookieParser = require('cookie-parser')
const connectDB = require('./config/database')
const AuthRouter = require('./routes/auth')
const ProfileRouter = require('./routes/profile')
const RequestRouter = require('./routes/request')


const app = express()


app.use(express.json());
app.use(cookieParser());
app.use(AuthRouter);
app.use(ProfileRouter);
app.use(RequestRouter);

connectDB().then(()=> {
    console.log('Connected to MongoDB')
    app.listen(3000,()=> {
        console.log('Server is running on port 3000')
    })
}).catch((err)=> {
    console.log(err)
})