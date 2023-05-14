const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GroupSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  group_name: {
    type: String,
    required: true,
  },

  group_section: {
    type: String,
    required: true,
  },
  group_supervisor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "supervisor",
  },
  group_project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  group_leader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  group_student1: [{ type: mongoose.Schema.Types.ObjectId, ref: "user", required: true, }],
  group_student2: [{ type: mongoose.Schema.Types.ObjectId, ref: "user", required: true, }],
  group_student3: [{ type: mongoose.Schema.Types.ObjectId, ref: "user", required: true, }],
});

module.exports = mongoose.model("group", GroupSchema);
