const mongoose = require('mongoose');

const noteShema = mongoose.Schema(
    {
        title:{
            type:String,
            required:[true, "please enter a title"]
        },
        note:{
            type:mongoose.Schema.Types.Mixed,
            required:false
        },
        addedDate:{
            type:Date,
            default:Date.now
        },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", 
            required: true 
        }
    },
    {
        timestamps:true
    }
);

const Note = mongoose.model("Note", noteShema);

module.exports = Note;