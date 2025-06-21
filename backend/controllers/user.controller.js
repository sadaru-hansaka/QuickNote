require('dotenv').config();
const User = require('../models/user.model');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// const JWT_SECRET=process.env.JWT_SECRET

const register = async (req, res)=> {
    const {name, email, password}=req.body;

    try{
        const userExixts = await User.findOne({email});
        if(userExixts) return res.status(400).send({message:"user Already exists"});

        const hashedPassword=await bcrypt.hash(password,10);
        const newUser = await User.create({name,email,password:hashedPassword});

        const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET,{expiresIn:"7d"});
        res.status(201).send(token)
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const login = async (req, res)=>{
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports={register,login}