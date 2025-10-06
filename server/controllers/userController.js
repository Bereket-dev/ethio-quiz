const QuizResult = require("../models/quizResultModel");

const updateUserScore = async (req, res) => {
  const { userId, categoryId } = req.params;
  const { score } = req.body;
  if (score === undefined || categoryId === undefined || userId === undefined) {
    return res
      .status(400)
      .json({ message: "Score, categoryId, and userId are required" });
  }
  try {
    const quizResult = await QuizResult.findOneAndUpdate(
      { userId, categoryId },
      { $inc: { score: score } },
      { upsert: true, new: true }
    );
    if (!quizResult) {
      return res.status(404).json({ message: "Failed to update quiz result!" });
    }
    res.status(200).json(quizResult);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { updateUserScore };
