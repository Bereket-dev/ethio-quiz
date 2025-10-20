const express = require("express");
const router = express.Router();

const {
  forgotPassword,
  resetPassword,
} = require("../controllers/tokenController");

router.post("/forgot-password", forgotPassword);
router.get("/reset-password/:token", resetPassword);

module.exports = router;
