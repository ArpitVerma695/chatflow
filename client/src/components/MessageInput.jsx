import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { BsEmojiSmile } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import socket from "../services/socket";

export default function MessageInput({
  text,
  setText,
  sendMessage,
  username,
  darkMode,
}) {

  const [showEmoji, setShowEmoji] = useState(false);

  const onEmojiClick = (emojiData) => {
    setText((prev) => prev + emojiData.emoji);
  };

  return (
    <div className="relative border-t bg-white p-0 sm:p-4">

      {showEmoji && (
        <div className="absolute bottom-20 left-4 z-50">
          <EmojiPicker
            onEmojiClick={onEmojiClick}
            width={300}
            height={350}
          />
        </div>
      )}

      <div className="flex items-center gap-3">

        <button
          onClick={() => setShowEmoji(!showEmoji)}
          className="text-2xl text-gray-600 hover:text-blue-600 transition"
        >
          <BsEmojiSmile />
        </button>

        <input
          type="text"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => {
            setText(e.target.value);

            socket.emit("typing", username);

            clearTimeout(window.typingTimer);

            window.typingTimer = setTimeout(() => {
              socket.emit("stop-typing");
            }, 1000);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          className="flex-1 border border-gray-300 rounded-full px-4 py-3 text-sm sm:text-base outline-none focus:border-blue-500"
        />

        <button
          onClick={sendMessage}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white w-11 h-11 sm:w-12 sm:h-12 rounded-full flex justify-center items-center shadow-lg hover:scale-105 transition"
        >
          <IoSend size={22} />
        </button>

      </div>

    </div>
  );
}