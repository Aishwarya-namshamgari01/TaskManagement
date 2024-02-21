import { matchedData } from "express-validator";
import TaskModel from "../../models/TaskModel.js";

const deleteLabelFromTask = async (req, res, next) => {
  try {
    const requestedData = matchedData(req);
    const { taskId, labelId } = requestedData;
    const result = await TaskModel.findByIdAndUpdate(
      {
        _id: taskId,
      },
      {
        $pull: {
          labels: labelId,
        },
      },
      { new: true }
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};
export default deleteLabelFromTask;
