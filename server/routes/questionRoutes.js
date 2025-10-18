const express = require("express");
const router = express.Router();
const {
  createNewQuestion,
  findQuestionsByCategory,
  editQuestion,
  removeQuestion,
  findAllQuestions,
  getQuestionStats,
} = require("../controllers/questionController");
const { authenticateToken } = require("../middleware/auth.js")

router.post("/create", authenticateToken, createNewQuestion);
router.put("/edit/:id", authenticateToken, editQuestion);
router.delete("/remove/:id", authenticateToken, removeQuestion);
router.get("/category/:categoryId", authenticateToken,findQuestionsByCategory);
router.get("/", authenticateToken, findAllQuestions);
router.get("/stats", authenticateToken, getQuestionStats);

module.exports = router;
