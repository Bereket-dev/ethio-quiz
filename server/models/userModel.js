const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: { type: String, default: null },
  score: { type: Number },
  quizzesTaken: { type: Number },
});

module.exports = mongoose.model("User", userSchema);
