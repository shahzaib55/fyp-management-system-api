const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  project_name: {
    type: String,
    required: true
  },
  project_type: {
    type: String,
    required: true
  },
  project_group: {
    type: Schema.Types.ObjectId,
    ref: "group",
    required: true
  },
  project_supervisor: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
});

module.exports = mongoose.model("project", ProjectSchema);
