import { useState } from "react";
import { useSelector } from "react-redux";
import Profile from "./profile";
import Chat from "./chatSection";
import MyJobs from "./Jobs";

function AdminDashboard() {
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  return (
    <div className="mx-auto">
      <div className="">
        <Profile />
      </div>
      <div className="flex">
        <div className="basis-2/3">
          <MyJobs />
        </div>
        <div className="basis-1/3">
          <Chat />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
