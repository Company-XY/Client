import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserJobs = () => {
  const [userJobs, setUserJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState("Pending");
  const [activeButton, setActiveButton] = useState("Pending");

  const userObjectString = localStorage.getItem("user");
  const userObject = JSON.parse(userObjectString);
  const userEmail = userObject.email;
  const token = userObject.token;

  useEffect(() => {
    const fetchUserJobs = async () => {
      try {
        const response = await axios.get(
          `https://assist-api-okgk.onrender.com/api/v1/jobs`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const filteredJobs = response.data.filter(
          (job) => job.user_email === userEmail
        );

        setUserJobs(filteredJobs);
        console.log(filteredJobs);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch user jobs:", error);
        setIsLoading(false);
      }
    };

    if (userEmail && token) {
      fetchUserJobs();
    }
  }, [userEmail, token]);

  const tabs = {
    InProgress: userJobs.filter((job) => job.stage === "Ongoing"),
    InProgress: userJobs.filter((job) => job.stage === "UnderReview"),
    Completed: userJobs.filter((job) => job.stage === "Completed"),
    Pending: userJobs.filter((job) => job.stage === "Pending"),
  };

  const switchTab = (tabName) => {
    setCurrentTab(tabName);
    setActiveButton(tabName);
  };

  const currentTabJobs = tabs[currentTab] || [];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">My Projects</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div className="flex space-x-6 py-2 my-1 text-center">
            <button
              className={`border p-2 rounded-lg ${
                activeButton === "Pending" ? "bg-blue-700" : ""
              }`}
              onClick={() => switchTab("Pending")}
            >
              Pending
            </button>
            <button
              className={`border p-2 rounded-lg ${
                activeButton === "InProgress" ? "bg-blue-700" : ""
              }`}
              onClick={() => switchTab("InProgress")}
            >
              In Progress
            </button>
            <button
              className={`border p-2 rounded-lg ${
                activeButton === "UnderReview" ? "bg-blue-700" : ""
              }`}
              onClick={() => switchTab("UnderReview")}
            >
              Under Review
            </button>
            <button
              className={`border p-2 rounded-lg ${
                activeButton === "Completed" ? "bg-blue-700" : ""
              }`}
              onClick={() => switchTab("Completed")}
            >
              Completed
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
                    <h3 className="text-lg font-semibold flex justify-between">
                      <p>{job.title}</p>
                      <p className="bg-blue-200 p-1 rounded-lg">
                        Bids: {job.bids.length}
                      </p>
                    </h3>
                    <p className="text-gray-600">{job.description}</p>
                    <p className="text-gray-600">Budget: {job.budget}</p>
                    <p className="text-gray-600 flex justify-between">
                      <p>Duration: {job.duration}</p>
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
