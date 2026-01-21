const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    isFavorite: {
  type: Boolean,
  default: false
   },
    status: {
      type: String,
      default: "todo",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);
