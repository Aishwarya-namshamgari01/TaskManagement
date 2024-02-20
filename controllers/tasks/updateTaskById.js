import TaskModel from "../../models/TaskModel.js";

const updateTaskById = async (req, res, next) => {
  try {
    const taskId = req.params.taskId;
    const role = req.user.role;
    const filter = {
      name: req.body?.name,
      description: req.body?.description,
      dueDate: req.body?.dueDate,
      status: req.body?.status,
      priority: req.body.priority,
      attachments: req?.files,
      comments: req.body?.comments,
      userId: req.body?.userId,
      categoryId: req.body?.categoryId,
      dependencies: req.body?.dependencies,
    };
    if (role === "ADMIN") {
      const result = await TaskModel.updateOne(
        {
          _id: taskId,
        },
        {
          $set: { ...filter },
        }
      );
      return res.status(200).json(result);
    }
    if (role === "USER") {
      const assignedUser = await TaskModel.findOne({
        _id: taskId,
        userId: req.user._id,
      });
      if (!assignedUser)
        return res
          .status(400)
          .json({ msg: "Task needs to be assigned to user before updation" });
      const result = await TaskModel.updateOne(
        {
          _id: taskId,
          userId: req.user._id,
        },
        {
          $set: filter,
        }
      );
      console.log({ result });
      return res.status(200).json(result);
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};
export default updateTaskById;
