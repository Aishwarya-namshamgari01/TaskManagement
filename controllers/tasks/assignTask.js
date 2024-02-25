import mongoose from "mongoose";
import TaskModel from "../../models/TaskModel.js";
import { matchedData } from "express-validator";
import NotificationModel from "../../models/NotificationModel.js";
import { emitMessage } from "../../sockets/notificationSocketConnection.js";
import notify from "../notifications.js/notify.js";

const assignTask = async (req, res, next) => {
  try {
    const role = req.user.role;
    const requestedData = matchedData(req);
    const taskId = requestedData.taskId;
    const updatedResult = await TaskModel.findByIdAndUpdate(
      { _id: taskId },
      { userId: requestedData.userId },
      { new: true }
    );
    if (updatedResult) {
      if (req.user._id.toString() === requestedData.userId) {
        notify(
          requestedData.userId,
          `You have been assigned a new task: ${taskId}`
        );
      }
      res.status(200).json({
        msg: "TASk assigned to user successfully",
        updatedResult: updatedResult,
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
export default assignTask;
