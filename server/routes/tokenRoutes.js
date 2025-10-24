const express = require("express");
const router = express.Router();

const {
  forgotPassword,
  resetPassword,
  sendConfirmationEmail,
  verifyEmail,
} = require("../controllers/tokenController");
const { tokenValidator } = require("../middleware/token");

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.get("/validate/:token", tokenValidator);
router.get("/resend-confirmation", sendConfirmationEmail);
router.get("/verify-email/:token", tokenValidator, verifyEmail);

module.exports = router;
