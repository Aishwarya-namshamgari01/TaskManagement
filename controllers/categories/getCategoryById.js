import CategoryModel from "../../models/CategoryModel.js";

const getCategoryById = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await CategoryModel.findOne({ _id: categoryId });
    res.status(200).json({ category });
  } catch (err) {
    res.status(500).json(err);
  }
};
export default getCategoryById;
