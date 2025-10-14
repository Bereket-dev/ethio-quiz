const express = require("express");
const router = express.Router();
const {
  updateUserScore,
  getHighScoreUser,
  getRecentQuizResult,
} = require("../controllers/quizResultController");

router.put("/update-score/:userId/:categoryId", updateUserScore);
router.get("/top-players", getHighScoreUser);
router.get("/recent-activity/:userId", getRecentQuizResult);

module.exports = router;
