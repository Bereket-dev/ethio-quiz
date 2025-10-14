const {
  signUpUser,
  loginUser,
  logoutUser,
} = require("../controllers/authController");
const { authenticateToken, requireAdmin } = require("../middleware/auth");

const express = require("express");
const router = express.Router();

router.get("/user", authenticateToken, (req, res) => {
  res.json({ loggedIn: true, user: req.user });
});
router.get("/admin", authenticateToken, requireAdmin, (req, res) => {
  res.json({ loggedIn: true, user: req.user });
});
router.post("/signup", signUpUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

module.exports = router;
