const { Category } = require("../models/quizModels");

const createNewCategory = async (req, res) => {
  const { title, img_src, color } = req.body;
  try {
    const image = {
      src: img_src,
      alt: `${title} image`,
    };
    const category = await Category.create({ title, image, color });
    res.status(201).json({ message: "Category created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create new category", error: error.message });
  }
};

const removeCategory = async (req, res) => {
  try {
    const result = await Category.findOneAndDelete({ title });
    if (!result)
      return res.status(404).json({ message: "Category not found!" });
    res.status(201).json({ message: "Category removed successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete category!", error: error.message });
  }
};

const getCategoriesByKingdom = async (req, res) => {
  try {
    const allCategories = await Category.findMany();
    res.status(201).json({ message: "All kingdoms getted successfully" });
    return allCategories;
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get all kingdom", error: error.message });
  }
};

module.exports = { createNewCategory, removeCategory, getCategoriesByKingdom };
