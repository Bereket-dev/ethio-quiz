const { Question } = require("../models/quizModels");
const bcrypt = require("bcryptjs");

const createNewQuestion = async (req, res) => {
  const { questionText, options, correctAnswer, categoryId, description } =
    req.body;

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
      description,
    });
    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const editQuestion = async (req, res) => {
  const { id } = req.params;
  const { questionText, options, correctAnswer, categoryId, description } =
    req.body;

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
        description,
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

const findQuestionsByCategoryForUser = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const questions = await Question.find({ categoryId }).select(
      "-description -correctAnswer"
    );
    if (!questions || questions.length === 0) {
      return res.status(404).json({ message: "Questions not found!" });
    }
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const findQuestionsByCategoryForAdmin = async (req, res) => {
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

const findAllQuestions = async (req, res) => {
  try {
    const allQuestions = await Question.find().select(
      "-description -correctAnswer"
    );
    if (!allQuestions || allQuestions.length === 0) {
      return res.status(404).json({ message: "Questions not found!" });
    }
    res.status(200).json({
      message: "Questions fetched successfullys!",
      questions: allQuestions,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getQuestionStats = async (req, res) => {
  try {
    const questionStats = await Question.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: "$category" },
      {
        $lookup: {
          from: "kingdoms",
          localField: "category.kingdomId",
          foreignField: "_id",
          as: "kingdom",
        },
      },
      { $unwind: "$kingdom" },
      {
        $group: {
          _id: "$kingdom._id",
          kingdom: { $first: "$kingdom.title" },
          count: { $sum: 1 },
        },
      },

      {
        $project: {
          _id: 0,
          kingdom: 1,
          count: 1,
        },
      },
    ]);

    res.status(200).json(questionStats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createNewQuestion,
  findQuestionsByCategoryForAdmin,
  findQuestionsByCategoryForUser,
  findAllQuestions,
  editQuestion,
  removeQuestion,
  getQuestionStats,
};
