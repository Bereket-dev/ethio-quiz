const {
  initialSeedQuestions,
  findManyCategoryQuestions,
  findOneCategoryQuestions,
} = require("../controllers/questionController");

const express = require("express");
const router = express.Router();

router.get("/", findManyCategoryQuestions);
router.get("/:id", findOneCategoryQuestions);

router.post("/initialized", initialSeedQuestions);
router.post("/check-answer", async (req, body) => {});

module.exports = router;
