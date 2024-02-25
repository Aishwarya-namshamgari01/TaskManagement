import { matchedData } from "express-validator";
import TaskModel from "../../models/TaskModel.js";

const createTask = async (req, res, next) => {
  try {
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

    const task = new TaskModel({
      name: name,
      description: description,
      dueDate: dueDate,
      status: status,
      priority: priority,
      attachments: req?.file?.path,
      comments: comments,
      userId: userId,
      categoryId: categoryId,
      dependencies: dependencies,
    });
    const result = await task.save();
    res.status(200).json({ msg: "Task created successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
};
export default createTask;
