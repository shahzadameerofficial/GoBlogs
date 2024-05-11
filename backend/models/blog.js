const mongoose = require('mongoose');

const { Schema } = mongoose;

const blogScheme = new Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    photoPath: {type: String, required:true},
    author: {type: mongoose.SchemaTypes.ObjectId, ref: 'User'} 
},
{
    timestamps: true
})

module.exports = mongoose.model('Blog', blogScheme, 'blogs')