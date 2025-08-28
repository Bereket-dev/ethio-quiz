const jwt = require("jsonwebtoken");

// Verify user is logged in
const authenticateToken = async (req, res, next) => {
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

// Check if user is admin
function requireAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
}

module.exports = { authenticateToken, requireAdmin };
