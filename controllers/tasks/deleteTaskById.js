import TaskModel from "../../models/TaskModel.js";

const deleteTaskById = async (req, res, next) => {
  try {
    const taskId = req.params.taskId;
    const role = req.user.role;
    const task = await TaskModel.findOne({ _id: taskId });
    if (task?.userId) {
      return res
        .status(400)
        .json({ msg: "Task assgined to user, you can't delete task" });
    }
    if (role === "ADMIN") {
      const result = await TaskModel.deleteOne({ _id: taskId });
      return res.status(200).json(result);
    } else if (role === "USER") {
      const result = await TaskModel.deleteOne({
        _id: taskId,
        userId: req.user._id,
      });
      {
        return res.status(200).json(result);
      }
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};
export default deleteTaskById;
