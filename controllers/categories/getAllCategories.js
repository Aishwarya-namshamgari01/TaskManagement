import CategoryModel from "../../models/CategoryModel.js";

const getAllCategories = (req, res, next) => {
  try {
    CategoryModel.find()
      .then((categories) => {
        res.status(200).json({ categories });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  } catch (err) {
    res.status(500).json({msg: "Something went wrong"});
  }
};
export default getAllCategories;
