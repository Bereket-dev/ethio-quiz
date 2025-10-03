const {
  getAllCategories,
  removeCategory,
  createNewCategory,
  editCategory,
} = require("../controllers/categoryController");

const multer = require("multer");
const upload = multer({ dest: "uploads/category/" });
const express = require("express");
const router = express.Router();

router.get("/", getAllCategories);
router.post("/create", upload.single("img_icon"), createNewCategory);
router.put("/edit/:id", upload.single("img_icon"), editCategory);
router.delete("/remove/:id", removeCategory);

module.exports = router;
