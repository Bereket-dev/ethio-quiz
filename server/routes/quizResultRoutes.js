const express = require("express");
const router = express.Router();
const {
  updateUserScore,
  getHighScoreUser,
  getRecentQuizResult,
  getMonthlyQuizStats,
} = require("../controllers/quizResultController");

router.put("/update-score/:userId/:categoryId", updateUserScore);
router.get("/top-players", getHighScoreUser);
router.get("/recent-activity/:userId", getRecentQuizResult);
router.get("/monthly-stats", getMonthlyQuizStats);

module.exports = router;
