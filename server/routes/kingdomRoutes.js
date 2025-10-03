const {
  getAllKingdoms,
  removeKingdom,
  createNewKingdom,
  editKingdom,
} = require("../controllers/kingdomController");

const multer = require("multer");
const upload = multer({ dest: "uploads/kingdom" });
const express = require("express");
const router = express.Router();

router.get("/", getAllKingdoms);
router.post("/create", upload.single("img_icon"), createNewKingdom);
router.put("/edit/:id", upload.single("img_icon"), editKingdom);
router.delete("/remove/:id", removeKingdom);

module.exports = router;
