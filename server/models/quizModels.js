const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  text: { type: String, required: true },
  isCorrect: { type: Boolean, required: true },
});

const questionSchema = new mongoose.Schema({
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  text: { type: String, required: true },
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
      min: { type: Number, required: true, default: 0 },
      sec: { type: Number, required: true, default: 0 },
    },
    image: {
      src: { type: String, required: true },
      alt: { type: String, default: "category icon" },
    },
    color: {
      light: { type: String },
      bold: { type: String, required: true },
    },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const kingdomSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  image: {
    src: { type: String, required: true, unique: true },
    alt: { type: String, default: "kingdom image" },
  },
  description: { type: String, required: true },
});

module.exports = {
  Kingdom: mongoose.model("Kingdom", kingdomSchema),
  Category: mongoose.model("Category", categorySchema),
  Question: mongoose.model("Question", questionSchema),
  Option: mongoose.model("Option", optionSchema),
};
