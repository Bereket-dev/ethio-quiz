const {
  signUpUser,
  loginUser,
  logoutUser,
} = require("../controllers/authController");
const { authenticateToken, requireAdmin } = require("../middleware/auth");
const passport = require("../config/passport");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

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

//google signin routers
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),

  function (req, res) {
    const token = jwt.sign(
      { id: req.user._id, role: req.user.role, username: req.user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    // Successful authentication, redirect.
    if (req.user.role == "admin") res.redirect(`${process.env.URL}/dashboard`);
    else res.redirect(`${process.env.URL}/quiz`);
  }
);

module.exports = router;
