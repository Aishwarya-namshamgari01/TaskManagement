import TaskModel from "../../models/TaskModel.js";

const addComment = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { comment, user } = req.body;
    const task = await TaskModel.findOne({ _id: taskId });
    if (task?.userId === user) {
      const updatedResult = await TaskModel.findByIdAndUpdate(
        {
          _id: taskId,
        },
        {
          $push: {
            comments: { comment, user },
          },
        },
        {
          new: true,
        }
      );
      return res.status(200).json(updatedResult);
    } else {
      return res
        .status(400)
        .json({ msg: "user should be assigned to the task to comment on it." });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};
export default addComment;
