const mongoose = require("mongoose");
const QuizResult = require("../models/quizResultModel");
const { Question } = require("../models/quizModels");

const submitQuiz = async (req, res) => {
  try {
    const { userId, categoryId, answers } = req.body;

    // Validate input
    if (!userId || !categoryId || !answers || !Array.isArray(answers)) {
      return res.status(400).json({ message: "Invalid quiz submission data" });
    }

    // Fetch questions for that category
    const questions = await Question.find({ categoryId });

    // Calculate score
    let score = 0;
    const resultDetails = questions.map((q) => {
      const userAnswer = answers.find((a) => a.questionId === q._id.toString());
      const isCorrect =
        userAnswer && userAnswer.selectedAnswer === q.correctAnswer;
      if (isCorrect) score++;

      return {
        questionId: q._id,
        questionText: q.questionText,
        selectedOption: userAnswer ? userAnswer.selectedAnswer : null,
        correctAnswer: q.correctAnswer,
        isCorrect,
        // description: q.description, // Optional: to show on result page
      };
    });

    // Update or create quiz result with best score
    const quizResult = await QuizResult.findOneAndUpdate(
      { userId, categoryId },
      { $max: { score: score } },
      { upsert: true, new: true }
    );

    res.status(200).json({
      message: "Quiz submitted successfully",
      score,
      totalQuestions: questions.length,
      quizResult,
      resultDetails,
    });
  } catch (error) {
    console.error("Submit Quiz Error:", error);
    res.status(500).json({ message: "Failed to submit quiz" });
  }
};

const getHighScoreUser = async (req, res) => {
  try {
    const topPlayers = await QuizResult.aggregate([
      {
        $group: {
          _id: "$userId",
          totalScore: { $sum: "$score" },
        },
      },
      {
        $sort: { totalScore: -1 },
      },
      {
        $limit: 20,
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userId",
        },
      },
      {
        $unwind: "$userId",
      },
      {
        $project: {
          _id: 0,
          userId: "$_id",
          username: "$userId.username",
          profileImage: "$userId.profileImage",
          totalScore: 1,
        },
      },
    ]);

    res.status(200).json(topPlayers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRecentQuizResult = async (req, res) => {
  const { userId } = req.params;

  try {
    const userIdObj = new mongoose.Types.ObjectId(userId); // string to object

    const recentQuizResult = await QuizResult.aggregate([
      { $match: { userId: userIdObj } },
      { $sort: { updatedAt: -1 } },
      { $limit: 6 },
    ]);

    res.status(200).json(recentQuizResult);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMonthlyQuizStats = async (req, res) => {
  try {
    const result = await QuizResult.aggregate([
      // Join category info
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: "$category" },
      // Group by category and month
      {
        $group: {
          _id: {
            category: "$category.title",
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.month": 1 } },
      // Group again by category for line chart format
      {
        $group: {
          _id: "$_id.category",
          data: {
            $push: {
              x: {
                $arrayElemAt: [
                  [
                    "",
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                  ],
                  "$_id.month",
                ],
              },
              y: "$count",
            },
          },
        },
      },
      // Final projection for chart library
      {
        $project: {
          _id: 0,
          id: "$_id",
          data: 1,
        },
      },
    ]);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const getTopPlayersStats = async (req, res) => {
  try {
    const topPlayersStats = await QuizResult.aggregate([
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
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $group: {
          _id: "$user.username",
          scores: { $push: "$score" },
          kingdoms: { $push: "$kingdom.title" },
          totalScore: { $sum: "$score" },
        },
      },
      {
        $sort: { totalScore: -1 },
      },
      {
        $limit: 4,
      },

      {
        $project: {
          _id: 0,
          player: "$_id",
          scores: 1,
          kingdoms: 1,
        },
      },
    ]);

    res.status(200).json(topPlayersStats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  submitQuiz,
  getHighScoreUser,
  getRecentQuizResult,
  getMonthlyQuizStats,
  getTopPlayersStats,
};
