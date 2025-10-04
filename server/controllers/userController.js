const User = require("../models/userModel");

const updateUserScore = async (req, res) => {
  const { userId } = req.params;
  const { score, quizzesTaken } = req.body;
  if (score === undefined || quizzesTaken === undefined) {
    return res
      .status(400)
      .json({ message: "Score and quizzesTaken are required" });
  }
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $inc: { score, quizzesTaken } },
      { new: true, runValidators: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { updateUserScore };
