import CategoryModel from "../../models/CategoryModel.js";

const deleteCategoryById = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;
    const role = req.user.role;
    const result = await CategoryModel.deleteOne({ _id: categoryId });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};
export default deleteCategoryById;
