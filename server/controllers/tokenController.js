const Token = require("../models/tokenModel");
const User = require("../models/userModel");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const sendMail = require("../utils/email");
const sendConfirmationEmail = require("../utils/sendConfirmationEmail");
const dotenv = require("dotenv");
dotenv.config();

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

    const resetLink = `${process.env.URL}/reset-password/${plainToken}`; // replace dynamically
    const year = new Date().getFullYear();

    const message = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Verify Your Email – Quiz Kingdom</title>
  <style>
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      background-color: #f5f6fa;
      margin: 0;
      padding: 0;
      color: #333333;
      line-height: 1.6;
    }
    .container {
      max-width: 600px;
      margin: 50px auto;
      background-color: #ffffff;
      border-radius: 12px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
      padding: 40px 30px;
      text-align: center;
      border: 1px solid #f0f0f0;
    }
    .logo {
      font-size: 26px;
      font-weight: 700;
      color: #1d4ed8;
      margin-bottom: 15px;
      letter-spacing: 0.5px;
    }
    h1 {
      color: #222222;
      font-size: 22px;
      margin-bottom: 10px;
    }
    p {
      color: #555555;
      font-size: 16px;
      margin: 15px 0;
    }
    .button {
      display: inline-block;
      margin-top: 25px;
      padding: 12px 28px;
      font-size: 16px;
      color: #ffffff !important;
      background-color: #1d4ed8;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 500;
      transition: background-color 0.3s ease;
    }
    .button:hover {
      background-color: #2563eb;
    }
    .link {
      color: #1d4ed8;
      word-break: break-all;
      font-size: 14px;
    }
    .footer {
      margin-top: 40px;
      font-size: 13px;
      color: #888888;
      border-top: 1px solid #eee;
      padding-top: 15px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">Quiz Kingdom</div>
    <h1>Verify Your Email Address</h1>
    <p>Hi there 👋,</p>
    <p>Thank you for joining <strong>Quiz Kingdom</strong>! To activate your account, please verify your email address by clicking the button below:</p>
    <p><a href="${resetLink}" class="button">Verify My Email</a></p>
    <p>If the button above doesn’t work, copy and paste this link into your browser:</p>
    <p class="link">${resetLink}</p>
    <div class="footer">
      <p>This link will expire in 1 hour for security reasons.</p>
      <p>If you didn’t sign up for Quiz Kingdom, please ignore this email.</p>
      <p>&copy; ${year} Quiz Kingdom. All rights reserved.</p>
      <p>This message was sent automatically from a verified sender. Please do not reply.</p>
    </div>
  </div>
</body>
</html>`;

    await sendMail(user.email, message, "Password Reset");
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
    if (
      !resetToken ||
      resetToken.expiresAt.getTime() < Date.now() ||
      resetToken.type != "passwordReset"
    )
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

const resendConfirmation = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) res.status(400).json({ message: "Email is required!" });

    const result = await sendConfirmationEmail(email);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
    const verificationToken = await Token.findOne({ tokenHash });
    if (!verificationToken)
      return res.status(400).json({ message: "Token not found!" });

    if (verificationToken.expiresAt.getTime() < Date.now())
      return res.status(400).json({ message: "Expired token!" });

    if (verificationToken.type != "emailVerification")
      return res.status(400).json({ message: "Invalid token!" });

    const userId = verificationToken.userId;
    const user = await User.findOne({ _id: userId });
    if (!user) return res.status(404).json({ message: "User not found!" });
    user.isVerified = true;
    await user.save();

    await verificationToken.deleteOne();

    res.status(200).json({ message: "Email confirmed successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  forgotPassword,
  resetPassword,
  resendConfirmation,
  verifyEmail,
};
