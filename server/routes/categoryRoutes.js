const {
  getAllCategories,
  removeCategory,
  createNewCategory,
  editCategory,
  findCategoriesByKingdom,
} = require("../controllers/categoryController");
const { authenticateToken } = require("../middleware/auth.js")

const multer = require("multer");
const upload = multer({ dest: "uploads/category/" });
const express = require("express");
const router = express.Router();
 
router.get("/", authenticateToken, getAllCategories);
router.get("/kingdom/:kingdomId", authenticateToken, findCategoriesByKingdom);
router.post("/create", authenticateToken, upload.single("img_icon"), createNewCategory);
router.put("/edit/:id", authenticateToken, upload.single("img_icon"), editCategory);
router.delete("/remove/:id", authenticateToken, removeCategory);

module.exports = router;
