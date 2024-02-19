import TaskModel from "../../models/TaskModel.js";

const getTaskById = async (req, res, next) => {
  try {
    const taskId = req.params.taskId;
    const task = await TaskModel.findOne({ _id: taskId });
    if (!task) {
      res.status(400).json({ msg: "Task doesn't exists" });
      return;
    }
    res.status(200).json({ task });
  } catch (err) {
    res.status(500).json(err);
  }
};
export default getTaskById;
