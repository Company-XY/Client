import { useState } from "react";

const MessagingUI = () => {
  const [messages, setMessages] = useState([
    { text: "Any further instructions that you may need?", sender: "client" },
    {
      text: "What should be the format for documentation?",
      sender: "freelancer",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage) {
      setMessages([...messages, { text: newMessage, sender: "client" }]);
      setNewMessage("");
      // Simulate a reply from the freelancer (for demonstration purposes)
      setTimeout(() => {
        setMessages([
          ...messages,
          { text: "Thanks for the message!", sender: "freelancer" },
        ]);
      }, 1000);
    }
  };

  return (
    <div className="bg-gray-100 flex flex-col py-2 px-10 h-fit">
      <h2 className="text-center font-semibold">
        You can communicate with the Client for any further clarification
      </h2>
      <hr />
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`${
              message.sender === "client" ? "justify-end" : "justify-start"
            } mb-4 flex`}
          >
            <div
              className={`${
                message.sender === "client" ? "bg-blue-500" : "bg-green-500"
              } p-3 text-white rounded-lg`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div className="p-4">
        <div className="flex items-center">
          <input
            type="text"
            className="flex-1 p-2 mr-2 border rounded-lg"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white p-2 rounded-lg"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessagingUI;
