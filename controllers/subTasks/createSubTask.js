import TaskModel from "../../models/TaskModel.js";

const createSubTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { name, status } = req.body;
    const updatedResult = await TaskModel.findByIdAndUpdate(
      { _id: taskId },
      {
        $push: {
          subTasks: { name, status },
        },
      },
      { new: true }
    );
    res.status(200).json(updatedResult);
  } catch (err) {
    res.status(500).json({ err });
  }
};
export default createSubTask;
