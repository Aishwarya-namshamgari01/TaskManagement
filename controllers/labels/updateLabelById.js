import { matchedData } from "express-validator";
import LabelModel from "../../models/LabelModel.js";

const updateLabelById = async (req, res, next) => {
  try {
    const requestedData = matchedData(req);
    const { labelId, name, color } = requestedData;
    const result = await LabelModel.updateOne(
      { _id: labelId },
      {
        $set: {
          name: name,
          color: color,
        },
      },
      { new: true }
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};
export default updateLabelById;
