const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./config/database')
const AuthRouter = require('./routes/auth')
const ProfileRouter = require('./routes/profile')
const RequestRouter = require('./routes/request')

const app = express()

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}))
app.use(express.json())
app.use(cookieParser())

app.use('/api', AuthRouter)
app.use('/api', ProfileRouter)
app.use('/api', RequestRouter)

const PORT = process.env.PORT || 3000

connectDB().then(() => {
  console.log('Connected to MongoDB')
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
}).catch((err) => {
  console.log(err)
})
