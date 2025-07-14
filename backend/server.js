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

const PORT = 8080;

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});


mongoose.connect(process.env.MONGODB_URI)
.then (()=> {
    console.log("Connected to the DB");
    app.listen(PORT, '0.0.0.0', ()=> {
        console.log(`Server is running on port ${PORT}`);
    })
})
.catch((err)=>{
    console.log("Something went wrong",err.message);
})