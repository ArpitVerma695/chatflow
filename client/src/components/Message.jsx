import { motion } from "framer-motion";
import { BsCheck2All } from "react-icons/bs";

export default function Message({
  msg,
  username,
  darkMode,
}) {
  const isMe = msg.username === username;

  return (
    <motion.div
      whileHover={{
        scale: 1.02,
       }}
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, type: "spring", bounce: 0.3}}
      className={`flex mb-4 ${
        isMe ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`relative max-w-[85%] sm:max-w-[75%] px-4 py-3 rounded-3xl shadow-lg ${
          isMe
            ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-br-md"
            : darkMode
            ? "bg-slate-700 text-white rounded-bl-md"
            : "bg-white text-gray-800 rounded-bl-md"
        }`}
      >
        {!isMe && (
          <p className="text-xs font-semibold mb-1 opacity-80">
            {msg.username}
          </p>
        )}

        <p className="leading-6 break-words">
          {msg.message}
        </p>

        <div className="flex justify-end items-center gap-1 mt-2">

          <span className="text-[11px] opacity-70">
            {new Date(msg.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>

          {isMe && (
            <BsCheck2All
              size={16}
              className="text-sky-300"
            />
          )}

        </div>
      </div>
    </motion.div>
  );
}