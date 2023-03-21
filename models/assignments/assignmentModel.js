const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,  
  title: {
    type: String,
    required: true,
  },
  open_date: {
    type: Date,
    default: Date.now,
  },
  due_date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("assignment", assignmentSchema);
