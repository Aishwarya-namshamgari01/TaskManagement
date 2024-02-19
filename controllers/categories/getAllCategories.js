import CategoryModel from "../../models/CategoryModel.js";

const getAllCategories = (req, res, next) => {
  try {
    // Pagination

    let skip = 0;
    let limit = null;
    if (req?.query?.page && req?.query?.limit) {
      skip = (req?.query?.page - 1) * req?.query?.limit;
      limit = req?.query?.limit;
    }

    CategoryModel.find()
      .skip(skip)
      .limit(limit)
      .sort({ updatedAt: -1 })
      .then((categories) => {
        res.status(200).json({ categories });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  } catch (err) {
    res.status(500).json({ msg: "Something went wrong" });
  }
};
export default getAllCategories;
