import mongoose from "mongoose";
import TaskModel from "../../models/TaskModel.js";
import { matchedData } from "express-validator";

const assignTask = async (req, res, next) => {
  try {
    const role = req.user.role;
    const requestedData = matchedData(req);
    if (role === "ADMIN" || req.user._id.toString() === requestedData.userId) {
      const taskId = requestedData.taskId;
      const updatedResult = await TaskModel.findByIdAndUpdate(
        { _id: taskId },
        { userId: requestedData.userId },
        { new: true }
      );
      if (updatedResult) {
        res.status(200).json({
          msg: "TASk assigned to user successfully",
          updatedResult: updatedResult,
        });
      }
    } else {
      res.status(401).json({
        msg: "only Admin can assign a task, Other user can assign tasks",
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
export default assignTask;
