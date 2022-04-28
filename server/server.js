const path = require('path')
const express = require('express');
const mongoose = require('mongoose')
const morgan = require('morgan')
const app = express();
const port = process.env.PORT || 5000
const cors = require('cors');
const userRoute = require('./Route/User')

const mongoDB = 'mongodb://localhost:27017';

mongoose.connect(mongoDB,()=>console.log("Database Connected.."))

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())


app.use('/api/user',userRoute)  

app.listen(port,()=>console.log(`Server running on ${port}`));