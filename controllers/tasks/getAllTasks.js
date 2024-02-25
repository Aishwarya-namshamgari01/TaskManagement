import { matchedData } from "express-validator";
import TaskModel from "../../models/TaskModel.js";

const getAllTasks = async (req, res, next) => {
  try {
    const role = req.user.role;
    const status = req.query.status;
    const priority = req?.query?.priority;
    const fromDate = req?.query?.fromDate;
    const toDate = req.query?.toDate;

    // Filtering requests based on status and priority

    let filterObj = {};
    if (status) filterObj.status = status;
    if (priority) filterObj.priority = priority;
    if (fromDate && toDate) {
      filterObj.createdAt = {
        $gte: new Date(fromDate),
        $lte: new Date(toDate),
      };
    }

    // Pagination
    let skip = 0;
    let limit = null;
    if (req?.query?.page && req?.query?.limit) {
      skip = (req?.query?.page - 1) * req?.query?.limit;
      limit = req?.query?.limit;
    }

    //Task Statistics and Reporting
    const totalTasks = await TaskModel.countDocuments({
      ...(role === "USER" && { userId: req.user._id }),
    });
    const pendingTasks = await TaskModel.countDocuments({
      status: "pending",
      ...(role === "USER" && { userId: req.user._id }),
    });
    const inProgressTasks = await TaskModel.countDocuments({
      status: "inProgress",
      ...(role === "USER" && { userId: req.user._id }),
    });
    const completedTasks = await TaskModel.countDocuments({
      status: "completed",
      ...(role === "USER" && { userId: req.user._id }),
    });

    const highPriorityTasks = await TaskModel.countDocuments({
      priority: "high",
      ...(role === "USER" && { userId: req.user._id }),
    });

      TaskModel.find({
        ...(role === "USER" && { userId: req.user._id }),
        ...filterObj,
      })
        .skip(skip)
        .limit(limit)
        .sort({ updatedAt: -1 })
        .then((tasks) => {
          res.status(200).json({
            tasks: tasks,
            totalTasks,
            pendingTasks,
            inProgressTasks,
            completedTasks,
            highPriorityTasks,
          });
        })
        .catch((err) => {
          res.status(500).json(err);
        });
  } catch (err) {
    res.status(500).json({ msg: "Something went wrong" });
  }
};
export default getAllTasks;
