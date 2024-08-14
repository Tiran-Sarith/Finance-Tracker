const mongoose = require('mongoose');
const Sequence = require('./sequenceModel');


const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true

    },
    role:{
        type: String, enum:["admin", "customer"], default:"customer"
    }
})


const user = mongoose.model("user",userSchema)
module.exports = user;