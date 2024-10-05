require('dotenv').config();
const express = require("express")
const mongoose = require("mongoose")
const userRoutes = require('../backend/routes/user_actions')
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors())

mongoose.set('autoCreate', false);
mongoose.connect("mongodb://localhost:27017/Voluntify")

app.use('/api/users', userRoutes);

app.listen(3001, () => {
    console.log("server is running!")
})
