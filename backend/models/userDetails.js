const mongoose = require('mongoose');

const { Schema } = mongoose;

const userDetailsSchema = new Schema({
    blogs: {type: Number, required: true},
    dateOfBirth: {type: String, required: true},
    gender: {type: String, required: true},
    type: {type: String, required: true}, // type of blogged technology, business all etc
    description: {type: String, required: true},
    photoPath: {type: String, required:true},
    user: {type: mongoose.SchemaTypes.ObjectId, ref: 'User'} 
},
{
    timestamps: true
})

module.exports = mongoose.model('UserDetails', userDetailsSchema, 'user-details')