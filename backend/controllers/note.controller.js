const Note = require('../models/note.model')

// create a note
const createNote = async (req, res) => {
    try{
        const note = await Note.create(req.body);
        res.status(200).send({success:true});
    }catch(error){
        res.status(500).send({message:error.message});
    }
}

// get all notes
const getNotes = async (req,res) => {
    try{
        const notes = await Note.find();
        res.status(200).send(notes)
    }catch(error){
        res.status(500).send({message:error.message});
    }
}

// get notes by ID
const getNotesById = async(req, res)=> {
    try{
        const {id} = req.params;
        const note=await Note.findById(id);
        if(!note){
            return res.status(404).send({message:"note not found"});
        }
        res.status(200).send(note);
    }catch(error){
        res.status(500).send({message:error.message});
    }
}


// update notes
const updateNotes = async (req,res)=> {
    try{
        const {id} = req.params;
        const note=await Note.findByIdAndUpdate(id, req.body);
        if(!note){
            return res.status(404).send({message:"note not found"});
        }
        const updatedNote = await Note.findById(id);
        res.status(200).send({success:true});
    }catch(error){
        res.status(500).send({message:error.message});
    }
}


// delete notes
const deletenotes = async (req, res)=> {
    try{
        const {id} = req.params;
        const note=await Note.findByIdAndDelete(id);
        if(!note){
            return res.status(404).send({message:"Note not found"});
        }
        res.status(200).send({success:true});
    }catch(error){
        res.status(500).send({message:error.message});
    }
}


module.exports = {createNote,getNotes, getNotesById,updateNotes,deletenotes};