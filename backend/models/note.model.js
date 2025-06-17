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
        }
    },
    {
        timestamps:true
    }
);

const Note = mongoose.model("Note", noteShema);

module.exports = Note;