import { matchedData } from "express-validator";
import TaskModel from "../../models/TaskModel.js";

const updateSubTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const requestedData = matchedData(req);
    const { subTaskId, status } = requestedData;
    const task = await TaskModel.findOne({ _id: taskId });
    const subTask = task.subTasks.id(subTaskId);
    if (!subTask) return res.status(404).json({ msg: "Subtask didn't found" });

    const updatedResult = await TaskModel.findByIdAndUpdate(
      {
        _id: taskId,
        "subTasks._id": subTaskId,
      },
      {
        $set: {
          "subTasks.0.status": status,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedResult);
  } catch (err) {
    res.status(500).json(err);
  }
};
export default updateSubTask;
