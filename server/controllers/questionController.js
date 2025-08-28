const { Question } = require("../models/quizModels");
const { totalQuestions } = require("../totalQuestions");

const initialSeedQuestions = async (req, res) => {
  try {
    await Question.deleteMany();
    await Question.insertMany(totalQuestions);
    res.status(201).json({ message: "Questions seeded successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const findManyCategoryQuestions = async (req, res) => {
  try {
    const questions = await Question.find(); // fixed here
    if (!questions || questions.length === 0)
      return res.status(404).json({ message: "Questions not found!" });

    return res.json(questions); // send response
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const findOneCategoryQuestions = async (req, res) => {
  const { title } = req.body; // consider moving to req.query or req.params
  try {
    const question = await Question.findOne({ title }); // fixed here
    if (!question)
      return res
        .status(404)
        .json({ message: "Question with this title not found!" });

    return res.json(question); // send response
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  initialSeedQuestions,
  findManyCategoryQuestions,
  findOneCategoryQuestions,
};
