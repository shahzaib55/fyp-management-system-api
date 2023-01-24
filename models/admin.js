const mongoose = require("mongoose");

const LoginSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    mobile:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
});

module.exports = mongoose.model('admin',LoginSchema);