const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const {expressjwt: jwt} = require('express-jwt')
const cors = require("cors")

app.use(cors({origin: 'http://localhost:5173'}))
app.use(express.json())
app.use(morgan('dev'))

mongoose.connect(
  'mongodb+srv://switch86:nb@cluster0.lqvjqrw.mongodb.net/?retryWrites=true&w=majority',
  () => console.log('Connected to the DB')
)

app.use('/auth/', require('./routes/authRouter.js'))
app.use('/nps/', require('./routes/npsRouter.js'))
app.use('/api/', jwt({secret: process.env.SECRET, algorithms: ['HS256']}))
app.use('/api/parks', require('./routes/parkRouter.js'))

app.use((err, req, res, next) => {
  console.log(err)
  if (err.name === "UnauthorizedError") {
    res.status(err.status)
  }
  return res.send({errMsg: err.message})
})

app.listen(9000, () => {
  console.log(`Server is running on local port 9000`)
})