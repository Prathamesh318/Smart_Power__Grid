import React, { useState } from 'react';
import { FaComments } from 'react-icons/fa'; // chat icon

const SmartGridChatbot = () => {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I’m your Smart Grid Assistant. Ask me anything about energy, demand or anomalies ⚡" }
  ]);
  const [userInput, setUserInput] = useState("");
  const [isOpen, setIsOpen] = useState(false); // toggle state

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessages = [...messages, { from: "user", text: userInput }];
    setMessages(newMessages);
    setUserInput("");

    try {
      const response = await fetch("http://localhost:5001/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput }),
      });

      const data = await response.json();

      // Clean the <think>...</think> part (optional improvement)
      const cleanReply = data.reply.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();

      setMessages([...newMessages, { from: "bot", text: cleanReply }]);
    } catch (err) {
      setMessages([...newMessages, { from: "bot", text: "Error fetching response." }]);
    }
  };

  return (
    <div className="fixed bottom-4 right-4">
      {/* Toggle Button */}
      <button
        onClick={toggleChat}
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg"
        aria-label="Open Chat"
      >
        <FaComments size={24} />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="mt-2 w-96 h-[480px] bg-white rounded-xl shadow-lg border border-gray-300 flex flex-col">
          <div className="bg-blue-600 text-white text-center py-2 rounded-t-xl font-semibold">
            Smart Grid Assistant 💡
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm">
            {messages.map((msg, idx) => (
              <div key={idx} className={`p-2 rounded-lg ${msg.from === "user" ? "bg-blue-100 text-right ml-12" : "bg-gray-100 mr-12"}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="flex p-2 border-t">
            <input
              className="flex-grow border rounded-l-md px-2 py-1 outline-none"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask your question..."
            />
            <button
              className="bg-blue-600 text-white px-3 rounded-r-md"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartGridChatbot;
