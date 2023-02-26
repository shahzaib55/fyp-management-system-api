const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    student_name:{
        type: String,
        required: true
    },
    student_rollno:{
        type: String,
        
        required: true
    },
    student_email:{
        type: Number,
        unique: true,
        required: true
    },
    student_section:{
        type: String,
        required: true
    },
    student_group:{
        type: String,
        required: true
    },
    student_company:{
        type: String,
        required: true
    },
    student_contact:{
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('student',StudentSchema);