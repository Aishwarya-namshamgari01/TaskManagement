import TaskModel from "../../models/TaskModel.js";

const createTask = async (req, res, next) => {
  try {
    const role = req.user.role;
    if (role === "ADMIN" || req.user._id === req.body.userId) {
      const task = new TaskModel({
        name: req.body.name,
        description: req.body.description,
        dueDate: req.body.dueDate,
        status: req.body.status,
        priority: req.body.priority,
        attachments: req?.file?.path,
        comments: req.body.comments,
        userId: req.body.userId,
        categoryId: req.body.categoryId,
        dependencies: req.body.dependencies,
      });
      const result = await task.save();
      res.status(200).json({ msg: "Task created successfully" });
    } else {
      res.status(401).json({
        msg: "only Admin can create a task, Other user can create tasks",
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
export default createTask;
