const express = require("express");
const router = express.Router();
const {
  createNewQuestion,
  findQuestionsByCategory,
  editQuestion,
  removeQuestion,
} = require("../controllers/questionController");
router.post("/create", createNewQuestion);
router.put("/edit/:id", editQuestion);
router.delete("/remove/:id", removeQuestion);
router.get("/category/:categoryId", findQuestionsByCategory);

module.exports = router;
