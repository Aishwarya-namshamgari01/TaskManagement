import CategoryModel from "../../models/CategoryModel.js";

const getCategoryById = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await CategoryModel.findOne({ _id: categoryId });
    if (!category) {
      res.status(400).json({ msg: "Category doesn't exists" });
      return;
    }
    res.status(200).json({ category });
  } catch (err) {
    res.status(500).json(err);
  }
};
export default getCategoryById;
