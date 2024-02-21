import LabelModel from "../../models/LabelModel.js";

const getAllLabels = async (req, res, next) => {
  try {
    LabelModel.find()
      .then((data) => res.status(200).json(data))
      .catch((err) => res.status(500).json(err));
  } catch (err) {
    res.status(500).json(err);
  }
};
export default getAllLabels;
