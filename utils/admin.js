require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose');
const uri = process.env.ATLAS_URI;
app.use(cors())
app.use(express.json())

mongoose.connect(uri,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
})

const connection = mongoose.connection;
connection.once("open",()=>{
    console.log("MongoDB database connection established successfully")
});

const port = process.env.PORT || 5000;
module.exports = {port,app,connection}