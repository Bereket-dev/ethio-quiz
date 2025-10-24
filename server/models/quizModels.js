const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: Number, required: true },
  description: { type: String },
});

const categorySchema = new mongoose.Schema(
  {
    kingdomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Kingdom",
      required: true,
    },
    title: { type: String, required: true, unique: true },
    points: { type: Number, required: true },
    timeAllowed: {
      type: String,
      required: true,
    },
    image: {
      src: { type: String, required: true },
      alt: { type: String, default: "category icon" },
    },
    color: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const kingdomSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  image: {
    src: { type: String, required: true },
    alt: { type: String, default: "kingdom image" },
  },
  description: { type: String, required: true },
});

module.exports = {
  Kingdom: mongoose.model("Kingdom", kingdomSchema),
  Category: mongoose.model("Category", categorySchema),
  Question: mongoose.model("Question", questionSchema),
};
