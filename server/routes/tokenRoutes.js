const express = require("express");
const router = express.Router();

const {
  forgotPassword,
  resetPassword,
} = require("../controllers/tokenController");
const { tokenValidator } = require("../middleware/token");

router.post("/forgot-password", forgotPassword);
router.get("/reset-password/:token", resetPassword);
router.get("/validate/:token", tokenValidator);

module.exports = router;
