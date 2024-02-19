import TaskModel from "../../models/TaskModel.js";

const getAllTasks = (req, res, next) => {
  try {
    const role = req.user.role;
    const status = req.query.status;
    const priority = req?.query?.priority;
    let filterObj = {};
    if (status) filterObj.status = status;
    if (priority) filterObj.priority = priority;

    if (role === "ADMIN") {
      TaskModel.find({ ...filterObj })
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
