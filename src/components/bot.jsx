import { useState, useEffect } from "react";
import axios from "axios";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    const chatMessagesContainer = document.getElementById("chat-messages");
    if (chatMessagesContainer) {
      chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
    }
  }, [chatMessages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const closeChat = () => {
    setIsOpen(false);
  };

  const sendMessage = () => {
    if (userMessage.trim() === "") return;

    const newUserMessage = { sender: "You", text: userMessage };
    setChatMessages([...chatMessages, newUserMessage]);

    const requestBody = {
      message: userMessage,
    };

    axios
      .post(
        "https://assist-api-okgk.onrender.com/api/v1/bot/message",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        const botResponse = response.data.response;
        const newBotMessage = { sender: "Chatbot", text: botResponse };
        setChatMessages([...chatMessages, newBotMessage]);
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });

    setUserMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-16 right-5">
      <div
        className={`${
          isOpen ? "hidden" : ""
        } bg-blue-700 text-white p-2 rounded-full cursor-pointer flex`}
        onClick={toggleChat}
      >
        {" "}
        <span className="ml-2 grid place-items-center font-bold">Get Help</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </div>

      <div
        className={`${
          isOpen ? "" : "hidden"
        } bg-white border border-gray-300 rounded-lg shadow-lg w-96`}
      >
        <div className="bg-blue-700 text-white py-2 px-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">
              Get Help from Assist Africa
            </span>
            <button
              className="text-white focus:outline-none"
              onClick={closeChat}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="px-4 py-3 h-60 overflow-y-auto" id="chat-messages">
          {chatMessages.map((message, index) => (
            <div
              key={index}
              className={`mb-2 ${
                message.sender === "You" ? "text-green-700" : "text-blue-700"
              }`}
            >
              <div className="font-semibold">{message.sender}:</div>
              <div>{message.text}</div>
            </div>
          ))}
        </div>

        <div className="px-4 py-2">
          <input
            type="text"
            placeholder="Type your message..."
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none mb-2"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            className="bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 focus:outline-none"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
