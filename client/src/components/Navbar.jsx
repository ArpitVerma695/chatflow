import { motion } from "framer-motion";
import { FaMoon, FaSun, FaCircle } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import socket from "../services/socket";

export default function Navbar({
  username,
  onlineUsers,
  darkMode,
  setDarkMode,
}) {
  const navigate = useNavigate();

  const logout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmLogout) return;

    localStorage.removeItem("username");

    socket.disconnect();

    navigate("/");
  };

  return (
    <motion.header
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-5 py-4 shadow-xl"
    >
      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-2xl font-bold tracking-wide">
            💬 ChatFlow
          </h1>

          <div className="flex items-center gap-2 mt-1">

            <FaCircle className="text-green-400 text-[10px] animate-pulse" />

            <span className="text-sm text-gray-100">

              {onlineUsers}

              {onlineUsers === 1
                ? " User Online"
                : " Users Online"}

            </span>

          </div>

        </div>

        <div className="flex items-center gap-3">


          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setDarkMode(!darkMode)}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex justify-center items-center"
          >
            {darkMode ? (
              <FaSun size={18} />
            ) : (
              <FaMoon size={18} />
            )}
          </motion.button>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3"
          >

            <div className="w-11 h-11 rounded-full bg-white text-blue-700 flex justify-center items-center font-bold text-lg shadow-lg">

              {username?.charAt(0).toUpperCase()}

            </div>

            <div className="hidden md:block">

              <h2 className="font-semibold">
                {username}
              </h2>

              <p className="text-xs text-gray-200">
                Active Now
              </p>

            </div>

          </motion.div>

          <motion.button
            whileHover={{
              scale: 1.15,
              rotate: 10,
            }}
            whileTap={{
              scale: 0.9,
            }}
            onClick={logout}
            className="w-10 h-10 rounded-full bg-red-500/20 hover:bg-red-500/40 flex justify-center items-center"
            title="Logout"
          >
            <MdLogout size={22} />
          </motion.button>

        </div>

      </div>
    </motion.header>
  );
}