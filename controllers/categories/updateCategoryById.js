import CategoryModel from "../../models/CategoryModel.js";

const updateCategoryById = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;
    const role = req.user.role;
    if (role === "ADMIN") {
      const result = await CategoryModel.updateOne(
        {
          _id: categoryId,
        },
        {
          $set: {
            name: req.body.name,
            description: req.body.description,
            color: req.body.color,
            icon: req?.file?.path,
          },
        }
      );
      res.status(200).json(result);
    } else {
      res.status(401).json({ msg: "Only admin can able to update category" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
export default updateCategoryById;
