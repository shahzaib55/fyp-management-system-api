const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    group_name:{
        type: String,
        required: true
    },
    rollno:{
        type: String,
        required: true
    },
    section:{
        type: String,
        required: true
    },
    mobile:{
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    project_name:{
        type: String,
        required: true
    },
    supervisor:{
        type: String,
        required: true
    },
    company:{
        type: String,
        required: true
    },
    company_contact:{
        type: String,
        required: true
    },
    project_type:{
        type: String,
        required: true
    },
   
});

module.exports = mongoose.model('project',UserSchema);