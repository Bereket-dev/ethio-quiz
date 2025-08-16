const { Kingdom } = require("../models/quizModels");
const cloudinary = require("../config/cloudinary");

const createNewKingdom = async (req, res) => {
  const { title, description } = req.body;
  const file = req.file;

  if (!title || !description) {
    return res
      .status(400)
      .json({ message: "Title and description are required" });
  }

  try {
    let image = null;
    if (file) {
      const result = await cloudinary.uploader.upload(file.path);
      image = {
        src: result.secure_url,
        alt: `${title} kingdom image`,
      };
    } else {
      return res.status(400).json({ message: "Image is required" });
    }

    const kingdom = await Kingdom.create({
      title,
      image,
      description,
    });
    res.status(201).json(kingdom);
  } catch (error) {
    console.error("Creation error:", error);
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Kingdom with this title already exists" });
    }
    res.status(500).json({ message: "Failed to create new kingdom" });
  }
};

const getAllKingdoms = async (req, res) => {
  try {
    const allKingdoms = await Kingdom.find();
    res.status(200).json({
      message: "All kingdoms fetched successfully",
      kingdoms: allKingdoms,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get all kingdom", error: error.message });
  }
};

module.exports = { createNewKingdom, getAllKingdoms };
