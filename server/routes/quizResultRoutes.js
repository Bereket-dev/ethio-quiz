const express = require("express");
const router = express.Router();
const {
  submitQuiz,
  getHighScoreUser,
  getRecentQuizResult,
  getMonthlyQuizStats,
  getTopPlayersStats,
} = require("../controllers/quizResultController");
const { authenticateToken } = require("../middleware/auth.js");

router.put("/submit", authenticateToken, submitQuiz);
router.get("/top-players", authenticateToken, getHighScoreUser);
router.get("/recent-activity/:userId", authenticateToken, getRecentQuizResult);
router.get("/monthly-stats", authenticateToken, getMonthlyQuizStats);
router.get("/top-players-stats", authenticateToken, getTopPlayersStats);

module.exports = router;
