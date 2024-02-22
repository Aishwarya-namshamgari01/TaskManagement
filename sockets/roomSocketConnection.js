import { Server } from "socket.io";

const roomSocketConnection = (server) => {
  const io = new Server(server);
  let roomNumber = 1;
  let full = 0;
  io.on("connection", (socket) => {
    console.log("user connceted");
    socket.join(`Room-${roomNumber}`);
    //emiting event to users who are connected that room
    io.sockets
      .in(`Room-${roomNumber}`)
      .emit("connectedRoom", `you are now connected to Room - ${roomNumber}`);
    full++;
    if (full >= 2) {
      full = 0;
      roomNumber++;
    }

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
};
export default roomSocketConnection;
