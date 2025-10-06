const mongoose = require("mongoose");

const quizResultSchema = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    score: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("QuizResult", quizResultSchema);
