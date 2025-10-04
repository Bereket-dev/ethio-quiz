const express = require("express");
const router = express.Router();
const { updateUserScore } = require("../controllers/userController");

router.put("/update-score/:userId", updateUserScore);

module.exports = router;
