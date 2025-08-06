const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "Unauthorized!" });

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = decode;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid Token!" });
  }
};

module.exports = authMiddleware;
