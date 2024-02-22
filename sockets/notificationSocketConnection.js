import { Server } from "socket.io";
import NotificationModel from "../models/NotificationModel.js";

let io;
const notificationSocketConnection = (server) => {
  io = new Server(server);
  io.on("connection", (socket) => {
    socket.on("join", async ({ userId }) => {
      socket.join(userId);
      const notifications = await NotificationModel.find();
      emitMessage({
        roomId: userId,
        type: "Notifications_updated",
        message: {
          type: "Notifications_updated",
        },
      });
    });

    socket.on("disconnect", () => {
      console.log("disconnected");
    });
  });
};

export const emitMessage = ({ roomId, type, message }) => {
  let room = roomId?.toString();
  io.to(room).emit(type, message);
};
export default notificationSocketConnection;
