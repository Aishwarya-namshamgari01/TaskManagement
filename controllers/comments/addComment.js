import { matchedData } from "express-validator";
import TaskModel from "../../models/TaskModel.js";
import notify from "../notifications.js/notify.js";

const addComment = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const requestedData = matchedData(req);
    const { comment, user } = requestedData;
    const task = await TaskModel.findOne({ _id: taskId });
    if (task?.userId.toString() === user) {
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
      notify(user, `${user} added a new comment: ${comment}`);
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
