import { matchedData } from "express-validator";
import TaskModel from "../../models/TaskModel.js";
import notify from "../notifications.js/notify.js";

const updateTaskById = async (req, res, next) => {
  try {
    const taskId = req.params.taskId;
    const role = req.user.role;
    const requestedData = matchedData(req);
    const {
      name,
      description,
      dueDate,
      status,
      priority,
      comments,
      userId,
      categoryId,
      dependencies,
    } = requestedData;
    const filter = {
      name: name,
      description: description,
      dueDate: new Date(dueDate),
      status: status,
      priority: priority,
      attachments: req?.files,
      comments: comments,
      userId: userId,
      categoryId: categoryId,
      dependencies: dependencies,
    };
    const task = await TaskModel.findOne({ _id: taskId });
    let changes = [];
    if (name && name !== task.name) {
      changes.push(`Task name changed from ${task.name} to ${name} `);
    }
    if (description && description !== task.description) {
      changes.push(
        `Task description changed from ${task.description} to ${description} `
      );
    }
    if (status && status !== task.status) {
      changes.push(`Task status changed from ${task.status} to ${status} `);
    }
    if (priority && priority !== task.priority) {
      changes.push(
        `Task priority changed from ${task.priority} to ${priority} `
      );
    }
    const result = await TaskModel.updateOne(
      {
        _id: taskId,
        ...(role === "USER" && { userId: req.user._id }),
      },
      {
        $set: filter,
      }
    );
    if (changes) {
      changes.map(async (change) => {
        notify(req?.user?._id, change);
      });
    }
    if (dueDate) {
      const daysUntillDue = Math.round(
        (Date.now() - dueDate) / (1000 * 60 * 60 * 24)
      );
      if (daysUntillDue >= 2) {
        notify(
          req?.user?._id,
          `Reminder: The deadline for '${task.name}' is approaching. It's due in ${daysUntillDue} day(s).`
        );
      }
    }

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json(err);
  }
};
export default updateTaskById;
