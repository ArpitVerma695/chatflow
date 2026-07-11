import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BsChatDotsFill } from "react-icons/bs";

export default function Login() {
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("username");

    if (user) {
      navigate("/chat");
    }
  }, [navigate]);

  const handleLogin = () => {
    const trimmedUsername = username.trim();

    if (!trimmedUsername) {
      alert("Please enter your username");
      return;
    }

    localStorage.setItem("username", trimmedUsername);

    navigate("/chat");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex justify-center items-center px-4">

      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>

      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>

      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="relative z-10 w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8"
      >

        <div className="flex justify-center">

          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex justify-center items-center shadow-xl">

            <BsChatDotsFill className="text-white text-4xl" />

          </div>

        </div>

        <h1 className="text-center text-4xl font-bold text-white mt-6">
          ChatFlow
        </h1>

        <p className="text-center text-gray-300 mt-2">
          Secure Real-Time Chat Application
        </p>


        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleLogin();
            }
          }}
          className="w-full mt-8 bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-white placeholder-gray-300 outline-none focus:border-blue-400 transition"
        />

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogin}
          className="w-full mt-6 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-lg"
        >
          Continue
        </motion.button>

        <p className="text-center text-gray-400 text-sm mt-6">
          Built with ❤️ using React • Node.js • Socket.io
        </p>

      </motion.div>

    </div>
  );
}