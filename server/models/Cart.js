const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true
    },
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
      }
    ],
    createdAt: {
      type: Date,
      default: Date.now
    }
  }
);

module.exports = mongoose.model("Cart", cartSchema);
