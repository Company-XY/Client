import { useState } from "react";
import { useSelector } from "react-redux";
import Profile from "./profile";
import Chat from "./chatSection";
import MyJobs from "./Jobs";

function AdminDashboard() {
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  return (
    <div
      className={`bg-${
        darkMode ? "gray" : "blue"
      }-900 text-white mt-16 h-[90vh]`}
    >
      <div className="h-[20%] w-full p-4">
        <Profile />
      </div>

      {/* Main Content Section */}
      <div className="flex space-x-4 justify-between h-3/4">
        <div className="flex-1 basis-2/3 bg-gray-800 p-4 rounded-lg">
          <MyJobs />
        </div>
        <div className="flex-1 basis-1/3 bg-gray-800 p-4 rounded-lg mb-4">
          <Chat />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
