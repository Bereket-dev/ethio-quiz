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
      { $max:{score:score}},
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

const getTopPlayers = async (req, res) => {
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

module.exports = { updateUserScore, getTopPlayers };
