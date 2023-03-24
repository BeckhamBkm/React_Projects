const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const uri = process.env.DB_URI;
mongoose.connect(uri,{useNewUrlParser:true})
.catch((err) => console.log(err));

const connection = mongoose.connection;

connection.once('open', () =>{
    console.log("Database connected Successfully");
})

app.listen(port,() =>{
    console.log(`Server running on port: ${port}`);
})