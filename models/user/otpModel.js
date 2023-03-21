const mongoose = require("mongoose");

const OtpSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    otp:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now,
        index: { expires: 500}

    }
    
   
},{timestamps: true});



module.exports = mongoose.model('Otp',OtpSchema);