const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./config/database')
const AuthRouter = require('./routes/auth')
const ProfileRouter = require('./routes/profile')
const RequestRouter = require('./routes/request')

const app = express()

const ALLOWED_ORIGINS = [
  'http://localhost:5173',
  ...(process.env.FRONTEND_URL
    ? process.env.FRONTEND_URL.split(',').map((o) => o.trim())
    : []),
]

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error(`CORS: origin ${origin} not allowed`))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}

app.use(cors(corsOptions))
app.options('*', cors(corsOptions))  // handle preflight for all routes

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
