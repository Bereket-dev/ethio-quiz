const { Kingdom } = require("../models/quizModels");
const cloudinary = require("../config/cloudinary");

const createNewKingdom = async (req, res) => {
  const { title, description } = req.body;
  const file = req.file;

  if (!title || !description) {
    return res
      .status(400)
      .json({ error: "Title and description are required" });
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
      return res.status(400).json({ error: "Image is required" });
    }

    const kingdom = await Kingdom.create({
      title,
      image,
      description,
    });
    res.status(201).json(kingdom);
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ error: "Kingdom with this title already exists" });
    }
    res.status(500).json({ error: "Failed to create new kingdom" });
  }
};

const editKingdom = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const file = req.file;

  if (!title || !description) {
    return res
      .status(400)
      .json({ error: "Title and description are required" });
  }

  try {
    const updateData = {
      title,
      description,
    };
    let image = null;
    if (file) {
      const result = await cloudinary.uploader.upload(file.path);
      image = {
        src: result.secure_url,
        alt: `${title} kingdom image`,
      };
    }

    if (image) updateData.image = image;

    const kingdom = await Kingdom.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    res.status(201).json(kingdom);
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ error: "Kingdom with this title already exists" });
    }
    res.status(500).json({ error: "Failed to update kingdom" });
  }
};

const removeKingdom = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Kingdom.findByIdAndDelete(id);
    if (!result) return res.status(404).json({ error: "Kingdom not found!" });

    res.status(200).json({ message: "Kingdom removed successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove kingdom" });
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
    res.status(500).json({ error: "Failed to get all kingdom" });
  }
};

module.exports = {
  createNewKingdom,
  editKingdom,
  removeKingdom,
  getAllKingdoms,
};
