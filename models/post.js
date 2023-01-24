const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: "required",
    },
    body: {
        type: String,
        required: "required",
    }
});

module.exports = mongoose.model("Post",postSchema);