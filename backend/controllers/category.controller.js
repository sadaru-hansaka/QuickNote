const Category = require('../models/category.model');

const createCategory = async(req,res)=>{
    try{
        const {name} = req.body;
        const existing = await Category.findOne({ name, user: req.user });
        if (existing) return res.status(400).json({ error: 'Category already exists' });


        const category = await Category.create(({name, user: req.user}));
        res.status(200).send({success:true});
    }catch(error){
        res.status(500).send({message:error.message});
    }
}

const getAllCategories = async (req, res)=>{
    try{
        const categories = await Category.find({user:req.user});
        res.status(200).send(categories);
    }catch(error){
        res.status(500).send({message:error.message});
    }
}

// get categories by id
const getCategory = async(req,res)=>{
    try{
        const {id} = req.params;
        const category = await Category.findById(id);
        res.status(200).send({category});
    }catch(error){
         res.status(500).send({message:error.message});
    }
}

const deleteCategories = async (req,res)=>{
    try{
        const {id} = req.params;
        const category=await Category.findByIdAndDelete(id);
        res.status(200).send({success:true});
    }catch(error){
        res.status(500).send({message:error.message});
    }
}

module.exports = {createCategory,getAllCategories,getCategory,deleteCategories};