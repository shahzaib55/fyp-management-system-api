const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      index: { expires: 500 },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("announcement", announcementSchema);
