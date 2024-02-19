import TaskModel from "../../models/TaskModel.js";

const getTasksByCategoryId = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;
    const result = await TaskModel.find({ categoryId: categoryId });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};
export default getTasksByCategoryId;
