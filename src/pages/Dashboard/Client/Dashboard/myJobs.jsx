import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserJobs = () => {
  const [userJobs, setUserJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState("Pending");
  const [activeButton, setActiveButton] = useState("Pending");
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const [count4, setCount4] = useState(0);

  const userObjectString = localStorage.getItem("user");
  const userObject = JSON.parse(userObjectString);
  const userEmail = userObject.email;
  const token = userObject.token;

  useEffect(() => {
    const fetchUserJobs = async () => {
      try {
        const response = await axios.get(
          `https://assist-api-5y59.onrender.com/api/v1/jobs`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const filteredJobs = response.data.filter(
          (job) => job.user_email === userEmail
        );

        filteredJobs.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setUserJobs(filteredJobs);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch user jobs:", error);
        setIsLoading(false);
      }
    };

    if (userEmail && token) {
      fetchUserJobs();
    }
  }, [userEmail, token, currentTab]);

  useEffect(() => {
    setCount1(userJobs.filter((job) => job.stage === "Pending").length);
    setCount2(userJobs.filter((job) => job.stage === "Ongoing").length);
    setCount3(userJobs.filter((job) => job.stage === "UnderReview").length);
    setCount4(userJobs.filter((job) => job.stage === "Complete").length);
  }, [userJobs]);

  const tabs = {
    InProgress: userJobs.filter((job) => job.stage === "Ongoing"),
    UnderReview: userJobs.filter((job) => job.stage === "UnderReview"),
    Completed: userJobs.filter((job) => job.stage === "Complete"),
    Pending: userJobs.filter((job) => job.stage === "Pending"),
  };

  const switchTab = (tabName) => {
    setCurrentTab(tabName);
    setActiveButton(tabName);
  };

  const currentTabJobs = tabs[currentTab] || [];

  return (
    <div className="py-4">
      <h2 className="text-2xl font-semibold mb-4">My Projects</h2>
      <hr className="border border-solid border-gray-500 my-4" />

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div className="flex space-x-1 md:space-x-6 md:py-2 my-1 text-center">
            <button
              className={`border p-2 rounded-lg ${
                activeButton === "Pending" ? "bg-blue-700 text-white" : ""
              }`}
              onClick={() => switchTab("Pending")}
            >
              Pending ({count1})
            </button>
            <button
              className={`border p-2 rounded-lg ${
                activeButton === "InProgress" ? "bg-blue-700 text-white" : ""
              }`}
              onClick={() => switchTab("InProgress")}
            >
              In Progress ({count2})
            </button>
            <button
              className={`border p-2 rounded-lg ${
                activeButton === "UnderReview" ? "bg-blue-700 text-white" : ""
              }`}
              onClick={() => switchTab("UnderReview")}
            >
              Under Review ({count3})
            </button>
            <button
              className={`border p-2 rounded-lg ${
                activeButton === "Completed" ? "bg-blue-700 text-white" : ""
              }`}
              onClick={() => switchTab("Completed")}
            >
              Completed ({count4})
            </button>
          </div>

          {currentTabJobs.length === 0 ? (
            <p className="font-semibold py-2 my-1 px-3">
              No projects in this category.
            </p>
          ) : (
            <div>
              {currentTabJobs.map((job, index) => (
                <Link to={`/dashboard/client/job/${job._id}`} key={index}>
                  <div className="bg-white p-4 mb-4 border border-gray-300 rounded-lg">
                    <h3 className="text-lg font-semibold flex justify-between my-2">
                      <p className="text-blue-700">{job.title}</p>
                      <p className="text-green-600 px-2 rounded-lg border hover:bg-slate-200">
                        Bids {job.bids.length}
                      </p>
                    </h3>
                    <p className="text-gray-600 py-1">{job.description}</p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Budget: </span>
                      <span className="text-blue-700">Ksh. {job.budget}</span>
                    </p>{" "}
                    <p className="text-gray-600">
                      <span className="font-semibold">Duration: </span>
                      <span className="text-blue-700">
                        {job.duration} days{" "}
                      </span>
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Skills: </span>
                      {job.skills && job.skills.length > 0
                        ? job.skills.map((skill, index) => (
                            <span key={index} className="text-blue-700">
                              {skill.label}
                              {index !== job.skills.length - 1 ? ", " : ""}
                            </span>
                          ))
                        : "No skills specified"}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserJobs;
