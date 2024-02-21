import { matchedData } from "express-validator";
import TaskModel from "../../models/TaskModel.js";

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
      dueDate: dueDate,
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
      changes.push(`Name changed from ${task.name} to ${name} `);
    }
    if (description && description !== task.description) {
      changes.push(
        `Description changed from ${task.description} to ${description} `
      );
    }
    if (dueDate && dueDate !== task.dueDate) {
      changes.push(`Due date changed from ${task.dueDate} to ${dueDate} `);
    }
    if (status && status !== task.status) {
      changes.push(`status changed from ${task.status} to ${status} `);
    }
    if (priority && priority !== task.priority) {
      changes.push(`priority changed from ${task.priority} to ${priority} `);
    }
    // if (comments && comments.length !== task.comments.length) {
    //   changes.push(`new Comment got added by ${comments?.[0].comment}`);
    // }

    if (role === "ADMIN") {
      const result = await TaskModel.updateOne(
        {
          _id: taskId,
        },
        {
          $set: { ...filter },
          $push: {
            taskHistory: { changes: changes.join(","), user: req.user._id },
          },
        }
      );
      return res.status(200).json(result);
    }
    if (role === "USER") {
      const assignedUser = await TaskModel.findOne({
        _id: taskId,
        userId: req.user._id,
      });
      if (!assignedUser)
        return res
          .status(400)
          .json({ msg: "Task needs to be assigned to user before updation" });
      const result = await TaskModel.updateOne(
        {
          _id: taskId,
          userId: req.user._id,
        },
        {
          $set: filter,
        }
      );
      return res.status(200).json(result);
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};
export default updateTaskById;
