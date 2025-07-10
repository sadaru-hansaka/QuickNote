const Note = require('../models/note.model')

// create a note
const createNote = async (req, res) => {
    try{
        const { title, note,categoryID } = req.body;
        const newnote = await Note.create({title,note,categoryID,user:req.user});
        res.status(200).send({success:true});
    }catch(error){
        res.status(500).send({message:error.message});
    }
}

// get all notes
const getNotes = async (req,res) => {
    try{
        const notes = await Note.find({ user: req.user }).sort({ createdAt: -1 });
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
        if (note.user.toString() !== req.user) {
            return res.status(403).send({ message: "Access denied" });
        }
        res.status(200).send(note);
    }catch(error){
        res.status(500).send({message:error.message});
    }
}

const getNotesByTitle = async(req, res)=> {
    try{
        const {title} = req.params;
        const note = await Note.find({title: { $regex: title, $options: 'i' },  user: req.user});
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
        if (note.user.toString() !== req.user) {
            return res.status(403).send({ message: "Access denied" });
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
        if (note.user.toString() !== req.user) {
            return res.status(403).send({ message: "Access denied" });
        }
        res.status(200).send({success:true});
    }catch(error){
        res.status(500).send({message:error.message});
    }
}

// PUT /api/notes/:id/favorite
const toggleFavorite = async (req, res) => {
    try {
        const {id} = req.params;
        const note = await Note.findById(id);

        if (!note) return res.status(404).json({ message: "Note not found" });

        note.favorite = !note.favorite; // toggle
        await note.save();

        res.status(200).json({ success: true, favorite: note.favorite });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


module.exports = {createNote,getNotes, getNotesById,updateNotes,deletenotes, getNotesByTitle,toggleFavorite};