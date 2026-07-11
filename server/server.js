import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";

import { initSocket } from "./socket/socket.js";
import messageRoutes from "./routes/messageRoutes.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const app = express();

const server = http.createServer(app);

initSocket(server);

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "ChatFlow API is Running 🚀",
  });
});

app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});