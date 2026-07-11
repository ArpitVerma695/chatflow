import Message from "../models/Message.js";
import { getIO } from "../socket/socket.js";

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { username, message } = req.body;

    if (!username?.trim() || !message?.trim()) {
      return res.status(400).json({
        message: "Username and Message are required",
      });
    }

    const newMessage = await Message.create({
      username: username.trim(),
      message: message.trim(),
    });

    io.emit("receive-message", newMessage);

    res.status(201).json(newMessage);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};