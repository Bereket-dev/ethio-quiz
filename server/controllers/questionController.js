const { Question } = require("../models/quizModels");

const createNewQuestion = async (req, res) => {
  const { questionText, options, correctAnswer, categoryId } = req.body;

  if (
    !questionText ||
    !Array.isArray(options) ||
    !options ||
    options.length < 2 ||
    correctAnswer == null
  ) {
    return res.status(400).json({ message: "Invalid question data" });
  }
  const correctAnswerIndex = parseInt(correctAnswer, 10);
  if (
    isNaN(correctAnswerIndex) ||
    correctAnswerIndex < 0 ||
    correctAnswerIndex >= options.length
  ) {
    return res
      .status(400)
      .json({ message: "Correct answer index is out of bounds" });
  }
  try {
    const question = await Question.create({
      questionText,
      options,
      correctAnswer: correctAnswerIndex,
      categoryId,
    });
    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const editQuestion = async (req, res) => {
  const { id } = req.params;
  const { questionText, options, correctAnswer, categoryId } = req.body;

  if (
    !questionText ||
    !Array.isArray(options) ||
    !options ||
    options.length < 2 ||
    correctAnswer == null
  ) {
    return res.status(400).json({ message: "Invalid question data" });
  }
  const correctAnswerIndex = parseInt(correctAnswer, 10);
  if (
    isNaN(correctAnswerIndex) ||
    correctAnswerIndex < 0 ||
    correctAnswerIndex >= options.length
  ) {
    return res
      .status(400)
      .json({ message: "Correct answer index is out of bounds" });
  }
  try {
    const question = await Question.findByIdAndUpdate(
      id,
      {
        questionText,
        options,
        correctAnswer: correctAnswerIndex,
        categoryId,
      },
      { new: true }
    );
    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const removeQuestion = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Question.findByIdAndDelete(id);
    if (!result) return res.status(404).json({ error: "Question not found!" });

    res.status(200).json({ message: "Question removed successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove question" });
  }
};

const findQuestionsByCategory = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const questions = await Question.find({ categoryId });
    if (!questions || questions.length === 0) {
      return res.status(404).json({ message: "Questions not found!" });
    }
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createNewQuestion,
  findQuestionsByCategory,
  editQuestion,
  removeQuestion,
};
