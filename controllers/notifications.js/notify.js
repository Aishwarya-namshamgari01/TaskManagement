import NotificationModel from "../../models/NotificationModel.js";
import { emitMessage } from "../../sockets/notificationSocketConnection.js";

const notify = async (user, message) => {
  await NotificationModel.create({
    user: user,
    message: message,
  });
  emitMessage({
    roomId: user,
    type: "Notifications_updated",
    message: {
      type: "Notifications_updated",
    },
  });
};
export default notify;
