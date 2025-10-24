const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendConfirmationEmail = require("../utils/sendConfirmationEmail");

const signUpUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashed,
      isVerified: false,
    });

    const confirmEmail = await sendConfirmationEmail(email);
    if (!confirmEmail)
      return res.status(500).json({ message: confirmEmail.message });

    res.status(201).json({
      message:
        "We've sent a verification link to your email. Please check your inbox to activate your account.",
    });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Email or username already exists" });
    }
    res.status(500).json({ message: "Server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found!" });

    if (!user.isVerified) {
      const confirmEmail = await sendConfirmationEmail(email);
      if (!confirmEmail)
        return res.status(500).json({ message: confirmEmail.message });

      return res.status(403).json({
        message:
          "Your email is not verified. A verification email has been sent.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ error: "Invalid Credentials!" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    res.json({
      message: "Logged in successfully",
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });

    return res.status(200).json({ message: "Logged out!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { signUpUser, loginUser, logoutUser };
