const express = require("express");
const router = express.Router();
const {
  updateUserScore,
  getHighScoreUser,
  getRecentQuizResult,
  getMonthlyQuizStats,
  getTopPlayersStats,
} = require("../controllers/quizResultController");
const { authenticateToken }= require("../middleware/auth.js")

router.put("/update-score/:userId/:categoryId", authenticateToken, updateUserScore);
router.get("/top-players", authenticateToken, getHighScoreUser);
router.get("/recent-activity/:userId", authenticateToken, getRecentQuizResult);
router.get("/monthly-stats", authenticateToken, getMonthlyQuizStats);
router.get("/top-players-stats", authenticateToken, getTopPlayersStats);

module.exports = router;
