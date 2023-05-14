const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
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
        required: true
    },
    mobile:{
        type: String,
        required: true
    },
    student_roll_no:{
        type: String

    },
    student_group:{
        type: String

    },
    student_company:{
        type: String

    },
    student_section:{
        type: String

    },
    role:{
        type: String,
        required: true

    },
    sup_groups:{
        type: Number

    },
    password:{
        type: String,
        required: true
    },
});
UserSchema.methods.generateJWT = function(){
    const token = jwt.sign({
        _id: this.id,
        number: this.number
    }, "hello",{expiresIn: "1d"});
    return token;
}

module.exports = mongoose.model('user',UserSchema);