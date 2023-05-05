const mongoose = require("mongoose");


const supervisorSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    supervisor_name:{
        type: String,
    },
    
    email:{
        type: String,
        required: true,
        unique: true
    },
    groups:{
        type: String,
        required: true
    },
    contact:{
        type: String,
        ref: "user"
    },
    

  
});

module.exports = mongoose.model('supervisor',supervisorSchema);