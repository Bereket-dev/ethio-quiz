const {
  getAllKingdoms,
  removeKingdom,
  createNewKingdom,
  editKingdom,
} = require("../controllers/kingdomController");
const { authenticateToken } = require("../middleware/auth.js")

const multer = require("multer");
const upload = multer({ dest: "uploads/kingdom" });
const express = require("express");
const router = express.Router();

router.get("/", getAllKingdoms);
router.post("/create", authenticateToken, upload.single("img_icon"), createNewKingdom);
router.put("/edit/:id", authenticateToken, upload.single("img_icon"), editKingdom);
router.delete("/remove/:id", authenticateToken, removeKingdom);

module.exports = router;
