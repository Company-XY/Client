import React from "react";

const Messages = () => {
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
            {/* Message 1 */}
            <div className="flex justify-start mb-4">
              <div className="rounded-lg p-2 bg-blue-200">
                <p>Message 1: This is a sample message.</p>
              </div>
            </div>

            {/* Message 2 */}
            <div className="flex justify-end mb-4">
              <div className="rounded-lg p-2 bg-green-200">
                <p>Message 2: Another sample message.</p>
              </div>
            </div>
          </div>

          {/* input */}
          <div className="p-4 border-t border-gray-300">
            <input
              type="text"
              placeholder="Type your message..."
              className="w-full border border-gray-300 rounded-full px-4 py-2"
            />
            <button className="mt-2 bg-purple-800 text-white rounded-full px-4 py-2 hover:bg-purple-600">
              Send
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Messages;
