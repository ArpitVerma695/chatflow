import Message from "./Message";

export default function ChatBox({
  messages,
  username,
  bottomRef,
  darkMode,
  loading,
}) {
    if (loading) {
  return (
    <div
      className={`flex-1 flex justify-center items-center ${
        darkMode ? "bg-slate-900" : "bg-slate-100"
      }`}
    >
      <div className="flex flex-col items-center gap-4">

        <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

        <p
          className={`text-sm ${
            darkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Loading messages...
        </p>

        </div>
      </div>
    );
  }
  return (
    
    <div
      className={`flex-1 overflow-y-auto p-3 sm:p-5 space-y-1 transition-all duration-300 ${
        darkMode
          ? "bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-slate-900"
          : "bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-gradient-to-b from-slate-100 via-blue-50 to-white"
      }`}
    >
      {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-400">
             No messages found 💬
          </div>
      ) : (
         messages.map((msg) => (
           <Message
              key={msg._id}
              msg={msg}
              username={username}
              darkMode={darkMode}
            />
        ))
      )}

      <div ref={bottomRef}></div>
    </div>
  );
}