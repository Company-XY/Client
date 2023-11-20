import { useState, useEffect } from "react";
import axios from "axios";

const Messages = ({ jobId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [freelancerEmail, setFreelancerEmail] = useState("");
  const userObjectString = localStorage.getItem("user");
  const userObject = JSON.parse(userObjectString);
  const userId = userObject._id;
  const userEmail = userObject.email;

  useEffect(() => {
    fetchMessages();
    fetchJob();
  }, []);

  const fetchJob = async () => {
    try {
      const response = await axios.get(
        `https://assist-api-5y59.onrender.com/api/v1/jobs/${jobId}`
      );
      const { assignedTo } = response.data;
      setFreelancerEmail(assignedTo);
    } catch (error) {
      console.error("Error fetching job:", error);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        `https://assist-api-5y59.onrender.com/api/v1/messages/${userId}`
      );
      setMessages(response.data.messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const sendMessage = async () => {
    try {
      await axios.post(
        `https://assist-api-5y59.onrender.com/api/v1/messages/create`,
        {
          from: userEmail,
          to: freelancerEmail,
          message: newMessage,
        }
      );
      setNewMessage("");
      fetchMessages();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex mt-12 bg-gray-100">
      {/* Main message content */}
      <main className="w-full p-4">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Messages</h2>
        </div>
        <div className="flex flex-col border border-gray-300 rounded-lg">
          {/* Messages container */}
          <div className="flex-grow p-4 overflow-y-auto">
            {messages.map((message, index) => (
              <div key={index} className="flex justify-start mb-4">
                <div className="rounded-lg p-2 bg-blue-200">
                  {/* Render individual message content */}
                  <p>{message.message}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-300">
            <input
              type="text"
              placeholder="Type your message..."
              className="w-full border border-gray-300 rounded-full px-4 py-2"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button
              onClick={sendMessage}
              className="mt-2 bg-purple-800 text-white rounded-full px-4 py-2 hover:bg-purple-600"
            >
              Send
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Messages;
