const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const kingdomRoutes = require("./routes/kingdomRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const questionRoutes = require("./routes/questionRoutes");
const { authenticateToken, requireAdmin } = require("./middleware/auth");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.use("/api/auth", authRoutes);
app.use("/api/kingdom", kingdomRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/questions", questionRoutes);
