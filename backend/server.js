require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const noteRoutes = require('./routes/note.route');

const app = express();
app.use(express.json());

app.use(cors());
app.use(express.json());

app.use('/api/notes', noteRoutes);


mongoose.connect(process.env.MONGODB_URI)
.then (()=> {
    console.log("Connected to the DB");
    app.listen(3000, ()=> {
        console.log("Server is running on port 3000");
    })
})
.catch(()=>{
    console.log("Something went wrong")
})