import NotificationModel from "../../models/NotificationModel.js";

const getAllNotifications = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const result = await NotificationModel.find({ user: userId });
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json(err);
  }
};
export default getAllNotifications;
