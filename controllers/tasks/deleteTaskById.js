import TaskModel from "../../models/TaskModel.js";

const deleteTaskById = async (req, res, next) => {
  try {
    const taskId = req.params.taskId;
    const role = req.user.role;
    const task = await TaskModel.findOne({ _id: taskId });
    if (task?.userId && task?.userId.toString() !== req.user._id.toString()) {
      return res
        .status(400)
        .json({ msg: "Task assgined to another user, you can't delete task" });
    }
    const result = await TaskModel.deleteOne({
      _id: taskId,
      ...(role === "USER" && { userId: req.user._id }),
    });
    {
      return res.status(200).json(result);
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};
export default deleteTaskById;
