require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const noteRoutes = require('./routes/note.route');
const userRoutes = require('./routes/user.route');
const categoryRoutes = require('./routes/category.route');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/notes', noteRoutes);
app.use('/api/user',userRoutes)
app.use('/api/category',categoryRoutes);


mongoose.connect(process.env.MONGODB_URI)
.then (()=> {
    console.log("Connected to the DB");
    app.listen(3000, ()=> {
        console.log("Server is running on port 3000");
    })
})
.catch((err)=>{
    console.log("Something went wrong",err.message);
})