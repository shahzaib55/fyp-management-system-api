const mongoose = require("mongoose");

const SupervisorSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    sup_name:{
        type: String,
        required: true
    },
    sup_email:{
        type: String,
        unique: true,
        required: true
    },
    sup_groups:{
        type: Number,
        required: true
    },
    sup_contact:{
        type: String,
        required: true
    },
});

module.exports = mongoose.model('supervisor',SupervisorSchema);