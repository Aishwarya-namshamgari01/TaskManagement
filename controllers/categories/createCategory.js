import { matchedData } from "express-validator";
import CategoryModel from "../../models/CategoryModel.js";

const createCategory = async (req, res, next) => {
  try {
    const role = req.user.role;
    const requestedData = matchedData(req);
    const { name, description, color } = requestedData;
    console.log({ requestedData });
    if (role === "ADMIN") {
      const category = CategoryModel({
        name: name,
        description: description,
        color: color,
        icon: req?.file?.path,
      });
      const result = await category.save();
      res.status(200).json({ msg: "Category created successfully" });
    } else {
      res.status(401).json({ msg: "Only admin can create categories" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
export default createCategory;
