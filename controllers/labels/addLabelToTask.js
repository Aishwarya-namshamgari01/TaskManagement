import { matchedData } from "express-validator";
import TaskModel from "../../models/TaskModel.js";
import mongoose, { Schema } from "mongoose";
import { ObjectId } from "mongoose";
const addLabelToTask = async (req, res, next) => {
  try {
    const requestedData = matchedData(req);
    const { taskId, labelId } = requestedData;
    const result = await TaskModel.findByIdAndUpdate(
      {
        _id: taskId,
      },
      {
        $addToSet: {
          labels: labelId,
        },
      },
      { new: true }
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err });
  }
};
export default addLabelToTask;
