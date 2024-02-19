import { matchedData } from "express-validator";
import TaskModel from "../../models/TaskModel.js";

const getAllTasks = (req, res, next) => {
  try {
    const role = req.user.role;
    const status = req.query.status;
    const priority = req?.query?.priority;

    // Filtering requests based on status and priority

    let filterObj = {};
    if (status) filterObj.status = status;
    if (priority) filterObj.priority = priority;

    // Pagination
    let skip = 0;
    let limit = null;
    if (req?.query?.page && req?.query?.limit) {
      skip = (req?.query?.page - 1) * req?.query?.limit;
      limit = req?.query?.limit;
    }

    if (role === "ADMIN") {
      TaskModel.find({ ...filterObj })
        .skip(skip)
        .limit(limit)
        .sort({ updatedAt: -1 })
        .then((tasks) => {
          res.status(200).json({ tasks });
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    } else if (role === "USER") {
      TaskModel.find({ userId: req.user._id, ...filterObj })
        .then((tasks) => {
          res.status(200).json({ tasks });
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    } else {
      res.status(401).json({ msg: "only Admin can view all the tasks" });
    }
  } catch (err) {
    res.status(500).json({ msg: "Something went wrong" });
  }
};
export default getAllTasks;
