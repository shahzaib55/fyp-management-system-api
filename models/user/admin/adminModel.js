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
LoginSchema.methods.generateJWT = function(){
    const token = jwt.sign({
        _id: this.id,
        number: this.number
    }, "hello",{expiresIn: "1d"});
    return token;
}

module.exports = mongoose.model('admin',LoginSchema);