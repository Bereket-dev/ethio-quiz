const express = require("express");
const router = express.Router();
const {
  updateUserScore,
  getTopPlayers,
} = require("../controllers/userController");

router.put("/update-score/:userId/:categoryId", updateUserScore);
router.get("/top-players", getTopPlayers);

module.exports = router;
