import TaskModel from "../../models/TaskModel.js";

const getTasksByUserId = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const result = await TaskModel.find({ userId: userId });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};
export default getTasksByUserId;
