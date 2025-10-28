const crypto = require("crypto");
const User = require("../models/userModel");
const Token = require("../models/tokenModel");
const sendMail = require("./email");
const dotenv = require("dotenv");
dotenv.config();

const sendConfirmationEmail = async (email) => {
  const user = await User.findOne({ email });

  if (!user) throw new Error("User not found!");
  if (user.isVerified)
    throw new Error("Email is already verified! Let's go to login...");
  const userId = user._id;

  const plainToken = crypto.randomBytes(32).toString("hex");
  const tokenHash = crypto
    .createHash("sha256")
    .update(plainToken)
    .digest("hex");
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); //1 hr

  const token = await Token.findOneAndUpdate(
    { userId, type: "emailVerification" },
    { tokenHash, expiresAt },
    { upsert: true, new: true }
  );

  const verifyLink = `${process.env.URL}/verify-email/${plainToken}`; // replace dynamically

  const message = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f7f7f7;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      padding: 30px;
      text-align: center;
    }
    h1 {
      color: #333333;
    }
    p {
      color: #555555;
      font-size: 16px;
      line-height: 1.5;
    }
    a.button {
      display: inline-block;
      margin-top: 20px;
      padding: 12px 25px;
      font-size: 16px;
      color: #ffffff;
      background-color: #1d4ed8;
      border-radius: 8px;
      text-decoration: none;
      transition: background-color 0.3s ease;
    }
    a.button:hover {
      background-color: #2563eb;
    }
    .footer {
      margin-top: 30px;
      font-size: 12px;
      color: #999999;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Welcome to Quiz Kingdom 🎉</h1>
    <p>Thank you for signing up! Please verify your email address by clicking the button below:</p>
    <a href="${verifyLink}" class="button">Verify Email</a>
    <p>If the button above doesn’t work, copy and paste the following link into your browser:</p>
    <p><a href="${verifyLink}" style="color: #1d4ed8;">${verifyLink}</a></p>
    <div class="footer">
      This verification link will expire in 1 hour. If you didn’t sign up, you can safely ignore this email.
    </div>
  </div>
</body>
</html>
`;
  await sendMail(user.email, message, "Email Confirmation");
  return { success: true, message: "Verification sent successfully!" };
};

module.exports = sendConfirmationEmail;
