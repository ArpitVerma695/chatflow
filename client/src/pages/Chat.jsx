import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";
import socket from "../services/socket";

import Navbar from "../components/Navbar";
import ChatBox from "../components/ChatBox";
import MessageInput from "../components/MessageInput";

export default function Chat() {
  const navigate = useNavigate();

  const username = localStorage.getItem("username");

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [typingUser, setTypingUser] = useState("");

  const [onlineUsers, setOnlineUsers] = useState(0);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [darkMode, setDarkMode] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    if (!username) {
      navigate("/");
    }
  }, [username, navigate]);

  const fetchMessages = async () => {
    try {
      setLoading(true);

      const res = await API.get("/messages");

      setMessages(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();

    socket.on("receive-message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("online-users", (count) => {
      setOnlineUsers(count);
    });

    socket.on("user-typing", (name) => {
      setTypingUser(name);
    });

    socket.on("user-stop-typing", () => {
      setTypingUser("");
    });

    return () => {
      socket.off("receive-message");
      socket.off("online-users");
      socket.off("user-typing");
      socket.off("user-stop-typing");
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const sendMessage = async () => {
    if (!text.trim()) return;

    try {
      await API.post("/messages", {
        username,
        message: text,
      });

      setText("");

      socket.emit("stop-typing");
    } catch (error) {
      console.log(error);
    }
  };

  const filteredMessages = messages.filter((msg) => {
    return (
      msg.message
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      msg.username
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  });

    return (
    <div
      className={`min-h-screen flex justify-center items-center p-2 sm:p-4 transition-all duration-300 ${
        darkMode
          ? "bg-slate-900"
          : "relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"
      }`}
    >
      <div
        className={`w-full sm:max-w-md md:max-w-lg lg:max-w-xl h-screen sm:h-[92vh] overflow-hidden rounded-none sm:rounded-3xl shadow-2xl flex flex-col transition-all duration-300 border ${
           darkMode
              ? "bg-slate-800/90 backdrop-blur-xl border-slate-700 text-white"
              : "bg-white/90 backdrop-blur-xl border-gray-200"
        }`}
      >

        <Navbar
          username={username}
          onlineUsers={onlineUsers}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <div
          className={`px-4 py-3 ${
            darkMode ? "bg-slate-800" : "bg-white"
          }`}
        >
          <input
            type="text"
            placeholder="🔍 Search messages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`w-full rounded-xl px-4 py-2 outline-none border transition-all ${
              darkMode
                ? "bg-slate-700 text-white border-slate-600 placeholder:text-slate-400"
                : "bg-gray-100 border-gray-300 placeholder:text-gray-500"
            }`}
          />
        </div>

        <ChatBox
          messages={filteredMessages}
          username={username}
          bottomRef={bottomRef}
          darkMode={darkMode}
          loading={loading}
        />

        {typingUser && (
          <div className="px-4 pb-2">
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                darkMode
                  ? "bg-slate-700 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              <span className="text-sm">
                {typingUser} is typing
              </span>

              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></span>
                <span
                  className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                  style={{ animationDelay: "0.15s" }}
                ></span>
                <span
                  className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                  style={{ animationDelay: "0.3s" }}
                ></span>
              </div>
            </div>
          </div>
        )}

        <MessageInput
          text={text}
          setText={setText}
          sendMessage={sendMessage}
          username={username}
          darkMode={darkMode}
        />
      </div>
    </div>
  );
}