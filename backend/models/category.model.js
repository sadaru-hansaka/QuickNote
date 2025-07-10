const mongoose = require('mongoose');

const categorySchema = mongoose.Schema(
    {
        name:{
            type: String,
            required:true,
            unique:true,
            trim:true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    }, {
        timestamps: true
    }
);

const Category = mongoose.model("Category", categorySchema);
module.exports=Category;