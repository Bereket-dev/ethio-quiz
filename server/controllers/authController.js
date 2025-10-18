const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signUpUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashed });

    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ error: "Email or username already exists" });
    }
    res.status(500).json({ error: "Server error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: "User not found!" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: "Invalid Credentials!" });

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
};

const logoutUser = async (req, res) => {
  res.clearCookie("token",{  
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      domain: "ethio-quiz.onrender.com",
    });
    
    return res.status(200).json({ message: "Logged out!" });
};

module.exports = { signUpUser, loginUser, logoutUser };
