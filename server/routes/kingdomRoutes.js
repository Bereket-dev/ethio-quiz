const {
  getAllKingdoms,
  removeKingdom,
  createNewKingdom,
  editKingdom,
} = require("../controllers/kingdomController");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const express = require("express");
const router = express.Router();

router.get("/", getAllKingdoms);
router.delete("/:title", removeKingdom);
router.post("/create", upload.single("img_icon"), createNewKingdom);
router.put("/edit", upload.single("img_icon"), editKingdom);

module.exports = router;
