import React, { useState } from "react";

const MyJobs = () => {
  const [activeTab, setActiveTab] = useState("open");

  // Sample job data categorized by tabs
  const jobData = {
    open: [
      {
        title: "Open Job 1",
        description: "Description for Open Job 1",
        status: "Open",
      },
      {
        title: "Open Job 2",
        description: "Description for Open Job 2",
        status: "Open",
      },
    ],
    ongoing: [
      {
        title: "Ongoing Job 1",
        description: "Description for Ongoing Job 1",
        status: "Ongoing",
      },
      {
        title: "Ongoing Job 2",
        description: "Description for Ongoing Job 2",
        status: "Ongoing",
      },
    ],
    cancelled: [
      {
        title: "Cancelled Job 1",
        description: "Description for Cancelled Job 1",
        status: "Cancelled",
      },
      {
        title: "Cancelled Job 2",
        description: "Description for Cancelled Job 2",
        status: "Cancelled",
      },
    ],
    completed: [
      {
        title: "Completed Job 1",
        description: "Description for Completed Job 1",
        status: "Completed",
      },
      {
        title: "Completed Job 2",
        description: "Description for Completed Job 2",
        status: "Completed",
      },
    ],
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="p-4 ">
      <h2 className="text-2xl font-semibold mb-4">My Projects</h2>
      <div className="flex space-x-4">
        <button
          onClick={() => handleTabClick("open")}
          className={`${
            activeTab === "open"
              ? "bg-purple-800 text-white"
              : "bg-gray-200 text-gray-800"
          } px-4 py-2 rounded-full w-full md:w-auto
          sm:px-2 sm:py-2 sm:text-sm sm:font-semibold`}
        >
          Open Projects
        </button>
        <button
          onClick={() => handleTabClick("ongoing")}
          className={`${
            activeTab === "ongoing"
              ? "bg-purple-800 text-white"
              : "bg-gray-200 text-gray-800"
          } px-4 py-2 rounded-full w-full md:w-auto
          sm:px-2 sm:py-2 sm:text-sm sm:font-semibold`}
        >
          Ongoing Projects
        </button>
        <button
          onClick={() => handleTabClick("cancelled")}
          className={`${
            activeTab === "cancelled"
              ? "bg-purple-800 text-white"
              : "bg-gray-200 text-gray-800"
          } px-4 py-2 rounded-full w-full md:w-auto
          sm:px-2 sm:py-2 sm:text-sm sm:font-semibold`}
        >
          Cancelled Projects
        </button>
        <button
          onClick={() => handleTabClick("completed")}
          className={`${
            activeTab === "completed"
              ? "bg-purple-800 text-white"
              : "bg-gray-200 text-gray-800"
          } px-4 py-2 rounded-full w-full md:w-auto
          sm:px-2 sm:py-2 sm:text-sm sm:font-semibold`}
        >
          Completed Projects
        </button>
      </div>

      <div className="mt-4">
        {jobData[activeTab].map((job, index) => (
          <div
            key={index}
            className="bg-white p-4 mb-4 border border-gray-300 rounded-lg"
          >
            <h3 className="text-lg font-semibold">{job.title}</h3>
            <p className="text-gray-600">{job.description}</p>
            <p className="text-gray-400">Status: {job.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyJobs;
