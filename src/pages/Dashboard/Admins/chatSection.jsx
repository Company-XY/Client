import React, { useState } from "react";

function ChatSection() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello!", sender: "User" },
    { id: 2, text: "Hi there!", sender: "Admin" },
    { id: 3, text: "How can I help you?", sender: "Admin" },
    { id: 4, text: "I have a question.", sender: "User" },
  ]);

  const [replyText, setReplyText] = useState("");
  const [selectedMessageId, setSelectedMessageId] = useState(null);

  const handleReply = (messageId) => {
    setSelectedMessageId(messageId);
  };

  const handleSendMessage = () => {
    if (replyText.trim() === "") return;

    const newMessage = {
      id: messages.length + 1,
      text: replyText,
      sender: "User",
    };

    if (selectedMessageId) {
      const repliedMessage = messages.find(
        (msg) => msg.id === selectedMessageId
      );
      newMessage.text = `Reply to ${repliedMessage.sender}: ${replyText}`;
      setSelectedMessageId(null);
    }

    setMessages([...messages, newMessage]);
    setReplyText("");
  };

  return (
    <div className="flex mt-12 bg-gray-100">
      <main className="w-full p-4">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Messages</h2>
        </div>
        <div className="flex flex-col border border-gray-300 rounded-lg">
          <div className="flex-grow p-4 overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex mb-4 ${
                  message.sender === "User" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`rounded-lg p-2 ${
                    message.sender === "User" ? "bg-purple-200" : "bg-blue-200"
                  }`}
                >
                  <p>{message.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-gray-300">
            <input
              type="text"
              placeholder="Type your message..."
              className="w-full border border-gray-300 rounded-full px-4 py-2"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            <button
              className="mt-2 bg-purple-800 text-white rounded-full px-4 py-2 hover:bg-purple-600"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ChatSection;
