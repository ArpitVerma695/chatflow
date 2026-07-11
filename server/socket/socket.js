import { Server } from "socket.io";

let io;
let onlineUsers = 0;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    onlineUsers++;

    io.emit("online-users", onlineUsers);

    socket.on("typing", (username) => {
      socket.broadcast.emit("user-typing", username);
    });

    socket.on("stop-typing", () => {
      socket.broadcast.emit("user-stop-typing");
    });

    socket.on("disconnect", () => {
      console.log("User Disconnected:", socket.id);

      onlineUsers--;

      io.emit("online-users", onlineUsers);
    });
  });

  return io;
};

export const getIO = () => io;