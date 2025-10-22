const Token = require("../models/tokenModel");
const crypto = require("crypto");

const tokenValidator = async (req, res) => {
  try {
    const { token } = req.params;

    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
    const resetToken = await Token.findOne({ tokenHash });
    if (!resetToken || resetToken.expiresAt.getTime() < Date.now())
      return res.status(400).json({ message: "Invalid or expired token!" });

    res.status(200).json({ isValid: true, message: "Valid token!" });
  } catch (error) {
    res.status(500).json({ isValid: false, message: error.message });
  }
};

module.exports = { tokenValidator };
