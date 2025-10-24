const express = require("express");
const router = express.Router();
const {
  createNewQuestion,
  editQuestion,
  removeQuestion,
  findAllQuestions,
  getQuestionStats,
  findQuestionsByCategoryForAdmin,
  findQuestionsByCategoryForUser,
} = require("../controllers/questionController");
const { authenticateToken, requireAdmin } = require("../middleware/auth.js");

router.post("/create", authenticateToken, requireAdmin, createNewQuestion);
router.put("/edit/:id", authenticateToken, requireAdmin, editQuestion);
router.delete("/remove/:id", authenticateToken, requireAdmin, removeQuestion);
router.get(
  "/category/:categoryId/admin",
  authenticateToken,
  requireAdmin,
  findQuestionsByCategoryForAdmin
);
router.get(
  "/category/:categoryId/user",
  authenticateToken,
  findQuestionsByCategoryForUser
);
router.get("/", authenticateToken, findAllQuestions);
router.get("/stats", authenticateToken, requireAdmin, getQuestionStats);

module.exports = router;
