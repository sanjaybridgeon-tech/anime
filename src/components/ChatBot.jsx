import { useState, useEffect } from "react";

function ChatBot() {
  const API = import.meta.env.VITE_API_URL;
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [funMessage, setFunMessage] = useState("");

  // 😂 FUNNY IDLE MESSAGES (like PUBG pet)
  useEffect(() => {
    const messages = [
      "Hey 👀 talk to me!",
      "I’m bored 😴",
      "Ask me about anime 😎",
      "I know secrets 🤫",
      "Don’t ignore me 😤"
    ];

    const interval = setInterval(() => {
      const random = messages[Math.floor(Math.random() * messages.length)];
      setFunMessage(random);

      setTimeout(() => setFunMessage(""), 2000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // 💬 SEND MESSAGE
  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMsg = { sender: "user", text: message };
    setChat(prev => [...prev, userMsg]);

    const currentMessage = message;
    setMessage("");

    // 🤖 Typing effect
    setChat(prev => [...prev, { sender: "bot", text: "Typing..." }]);

    try {
      const res = await fetch(`${API}/chat`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ message: currentMessage }),
});

      const data = await res.text();

      // Replace "Typing..." with real response
      setChat(prev => {
        const updated = [...prev];
        updated.pop();
        return [...updated, { sender: "bot", text: data }];
      });

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* 😂 FUN MESSAGE */}
     {!open && funMessage && (
  <div className="fixed bottom-32 right-16 flex flex-col items-end z-50">

    {/* 💭 Main cloud */}
    <div className="bg-white text-black px-4 py-2 rounded-full shadow-lg max-w-[200px] text-sm">
      {funMessage}
    </div>

    {/* 💭 Small bubbles */}
    <div className="flex flex-col items-end mr-4 mt-1">
      <span className="w-3 h-3 bg-white rounded-full shadow"></span>
      <span className="w-2 h-2 bg-white rounded-full shadow mt-1 mr-2"></span>
      <span className="w-1.5 h-1.5 bg-white rounded-full shadow mt-1 mr-4"></span>
    </div>

  </div>
)}

      {/* 🤖 BOT IMAGE */}
      <img
        src="/images/Bot4.png"
        alt="bot"
        onClick={() => setOpen(!open)}
        className="fixed bottom-10 right-10 w-20 h-20 cursor-pointer z-50 hover:scale-110 transition duration-300"
        style={{
          animation: "float 3s ease-in-out infinite"
        }}
      />

      {/* 💬 CHAT WINDOW */}
      {open && (
        <div className="fixed bottom-32 right-10 w-80 bg-white/10 backdrop-blur-lg text-white rounded-xl p-4 border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)] z-50">

          {/* 🧾 MESSAGES */}
          <div className="h-60 overflow-y-auto mb-3 space-y-2">
            {chat.map((msg, i) => (
              <div
                key={i}
                className={`relative max-w-[70%] px-4 py-2 text-sm shadow-xl ${
                  msg.sender === "user"
                    ? "ml-auto bg-yellow-300 text-black rounded-[30px] rounded-br-none"
                    : "mr-auto bg-white text-black rounded-[30px] rounded-bl-none"
                }`}
                style={{
                  boxShadow: "0 5px 15px rgba(0,0,0,0.2)"
                }}
              >
                {msg.text}

                {/* ☁️ Bubble Tail */}
                <span
                  className={`absolute w-4 h-4 ${
                    msg.sender === "user"
                      ? "bg-yellow-300 right-[-8px] bottom-1 rounded-full"
                      : "bg-white left-[-8px] bottom-1 rounded-full"
                  }`}
                ></span>
              </div>
            ))}
          </div>

          {/* ✏️ INPUT */}
          <div className="flex gap-2">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 p-2 text-black rounded"
              placeholder="Ask about anime..."
            />
            <button
              onClick={sendMessage}
              className="bg-yellow-400 px-3 rounded text-black"
            >
              Send
            </button>
          </div>

        </div>
      )}
    </>
  );
}

export default ChatBot;