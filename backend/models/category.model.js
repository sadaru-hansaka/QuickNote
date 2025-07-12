const mongoose = require('mongoose');

const categorySchema = mongoose.Schema(
    {
        name:{
            type: String,
            required:true,
            trim:true
        },
        color: {
            type: String,
            required: false,
            trim: true,
            match: /^#([0-9A-Fa-f]{3}){1,2}$/,
            default: null,
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
categorySchema.index({ name: 1, user: 1 }, { unique: true });
const Category = mongoose.model("tgs", categorySchema);
module.exports=Category;