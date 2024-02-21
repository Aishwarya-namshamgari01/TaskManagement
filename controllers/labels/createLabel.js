import { matchedData } from "express-validator";
import LabelModel from "../../models/LabelModel.js";

const createLabel = async (req, res, next) => {
  try {
    const requestedData = matchedData(req);
    const { name, color } = requestedData;
    const label = LabelModel({
      name: name,
      color: color,
    });
    const result = await label.save();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};
export default createLabel;
