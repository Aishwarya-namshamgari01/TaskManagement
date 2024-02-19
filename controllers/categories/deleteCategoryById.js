import CategoryModel from "../../models/CategoryModel.js";

const deleteCategoryById = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;
    const role = req.user.role;
    if (role === "ADMIN") {
      const category = await CategoryModel.findOne({ _id: categoryId });
      if (!category) {
        res.status(400).json({ msg: "Category doesn't exists" });
        return;
      }
      const result = await CategoryModel.deleteOne({ _id: categoryId });
      res.status(200).json(result);
    } else {
      res.status(401).json({ msg: "Only admin can able to delete categories" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
export default deleteCategoryById;
