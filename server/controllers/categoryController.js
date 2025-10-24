const { Category } = require("../models/quizModels");
const cloudinary = require("../config/cloudinary");

const createNewCategory = async (req, res) => {
  const { title, description, points, timeAllowed, color, kingdomId } =
    req.body;
  const file = req.file;

  if (!title) return res.status(400).json({ message: "A title is required" });
  if (!description)
    return res.status(400).json({ message: "A description is required" });
  if (!points) return res.status(400).json({ message: "Points are required" });
  if (!timeAllowed)
    return res.status(400).json({ message: "A timeAllowed is required" });
  if (!color) return res.status(400).json({ message: "A color is required" });
  if (!kingdomId)
    return res.status(400).json({ message: "A kingdomId is required" });

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

    const category = await Category.create({
      title,
      image,
      description,
      points,
      timeAllowed,
      color,
      kingdomId,
    });
    res.status(201).json(category);
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Category with this title already exists" });
    }
    res.status(500).json({ message: "Failed to create new category" });
  }
};

const editCategory = async (req, res) => {
  const { id } = req.params;
  const { title, description, points, timeAllowed, color, kingdomId } =
    req.body;
  const file = req.file;

  if (!title) return res.status(400).json({ message: "A title is required" });
  if (!description)
    return res.status(400).json({ message: "A description is required" });
  if (!points) return res.status(400).json({ message: "Points are required" });
  if (!timeAllowed)
    return res.status(400).json({ message: "A timeAllowed is required" });
  if (!color) return res.status(400).json({ message: "A color is required" });
  if (!kingdomId)
    return res.status(400).json({ message: "A kingdomId is required" });

  try {
    const updateData = {
      title,
      description,
      points,
      timeAllowed,
      color,
      kingdomId,
    };
    let image = null;
    if (file) {
      const result = await cloudinary.uploader.upload(file.path);
      image = {
        src: result.secure_url,
        alt: `${title} image`,
      };
    }

    if (image) updateData.image = image;

    const category = await Category.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    res.status(201).json(category);
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Category with this title already exists" });
    }
    res.status(500).json({ message: "Failed to update category" });
  }
};

const removeCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Category.findByIdAndDelete(id);
    if (!result)
      return res.status(404).json({ message: "Category not found!" });

    res.status(200).json({ message: "Category removed successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove category" });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const allCategories = await Category.find();
    if (!allCategories || allCategories.length === 0) {
      return res.status(404).json({ message: "Categories not found!" });
    }
    res.status(200).json({
      message: "All categories fetched successfully",
      categories: allCategories,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to get all category" });
  }
};

const findCategoriesByKingdom = async (req, res) => {
  const { kingdomId } = req.params;

  try {
    const categories = await Category.find({ kingdomId });
    if (!categories || categories.length === 0) {
      return res
        .status(404)
        .json({ message: "Categories of this kingdom not found!" });
    }
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  createNewCategory,
  editCategory,
  removeCategory,
  getAllCategories,
  findCategoriesByKingdom,
};
