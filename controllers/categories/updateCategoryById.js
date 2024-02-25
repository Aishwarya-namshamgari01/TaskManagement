import { matchedData } from "express-validator";
import CategoryModel from "../../models/CategoryModel.js";

const updateCategoryById = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;
    const role = req.user.role;
    const requestedData = matchedData(req);
    const { name, description, color } = requestedData;
    const result = await CategoryModel.updateOne(
      {
        _id: categoryId,
      },
      {
        $set: {
          name: name,
          description: description,
          color: color,
          icon: req?.file?.path,
        },
      }
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};
export default updateCategoryById;
