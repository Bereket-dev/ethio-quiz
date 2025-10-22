const Token = require("../models/tokenModel");
const User = require("../models/userModel");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const sendMail = require("../utils/email");

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(401).json({ message: "User not found!" });
    const userId = user._id;

    const plainToken = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto
      .createHash("sha256")
      .update(plainToken)
      .digest("hex");
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    const token = await Token.findOneAndUpdate(
      { userId, type: "passwordReset" },
      { tokenHash, expiresAt },
      { upsert: true, new: true }
    );

    const resetLink = `https://ethio-quiz.vercel.app/reset-password/${plainToken}`; // replace dynamically
    const year = new Date().getFullYear();

    const message = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Password Reset Request</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f7;
      color: #333333;
      padding: 20px;
    }
    .container {
      max-width: 600px;
      margin: auto;
      background-color: #ffffff;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    }
    .btn {
      display: inline-block;
      padding: 12px 20px;
      margin-top: 20px;
      background-color: #4CAF50;
      color: white;
      text-decoration: none;
      border-radius: 5px;
    }
    .footer {
      margin-top: 30px;
      font-size: 12px;
      color: #888888;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>Password Reset Request</h2>
    <p>Hello,</p>
    <p>We received a request to reset your password. Click the button below to set a new password:</p>
    <a class="btn" href="${resetLink}">Reset Password</a>
    <p>If the button doesn't work, copy and paste the following link into your browser:</p>
    <p><a href="${resetLink}">${resetLink}</a></p>
    <p>If you did not request a password reset, please ignore this email.</p>
    <div class="footer">
      &copy; ${year} ethio quiz. All rights reserved.
    </div>
  </div>
</body>
</html>`;

    await sendMail(user.email, message);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const { token } = req.params;

    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
    const resetToken = await Token.findOne({ tokenHash });
    if (!resetToken || resetToken.expiresAt.getTime() < Date.now())
      return res.status(400).json({ message: "Invalid or expired token!" });

    const userId = resetToken.userId;
    const user = await User.findOne({ _id: userId });
    if (!user) return res.status(404).json({ message: "User not found!" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();

    await resetToken.deleteOne();

    res.status(200).json({ message: "Password reset successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { forgotPassword, resetPassword };
