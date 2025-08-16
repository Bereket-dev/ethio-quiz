const {
  getAllKingdoms,
  createNewKingdom,
} = require("../controllers/kingdomController");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const express = require("express");
const router = express.Router();

router.get("/", getAllKingdoms);
router.post("/create", upload.single("img_icon"), createNewKingdom);

module.exports = router;
