import { Server } from "socket.io";

const createSocketConnection = (server) => {
  const io = new Server(server);
  let users = 1;
  io.on("connection", (socket) => {
    console.log("socket connected");

    setTimeout(() => {
      //sending message
      socket.send("Hey, How are you.., I am messsage");

      // sending custom event
      socket.emit("chatMessage", "Custom chat message"); //used to create custom events
    }, 3000);

    //fetch event from client side
    socket.on("clientEvent", (data) => {
      console.log(data);
    });

    //broadCasting events
    users++;
    //This is for broadcasting to everyone
    
    // io.sockets.emit("broadcast", { msg: users + " users got connected" });

    //Give me a msg to newly connected user
    socket.emit("newUser", { msg: "Hello, welcome Dear..." });

    //This is for already connected users
    socket.broadcast.emit("newUser", { msg: users + " user got connected" });

    socket.on("disconnect", () => {
      users--;
      //   io.sockets.emit("broadcast", { msg: users + " users got connected" });

      socket.broadcast.emit("newUser", { msg: users + " users got connected" });
      console.log("socket disconnected");
    });
  });
};
export default createSocketConnection;
