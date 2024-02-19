import mongoose from "mongoose";
import TaskModel from "../../models/TaskModel.js";

const assignTask = async (req, res, next) => {
  try {
    const role = req.user.role;
    if (role === "ADMIN" || req.user._id.toString() === req.body.userId) {
      const taskId = req.body.taskId;
      const updatedResult = await TaskModel.findByIdAndUpdate(
        { _id: taskId },
        { userId: req.body.userId },
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
