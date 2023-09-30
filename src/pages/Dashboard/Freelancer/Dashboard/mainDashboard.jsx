import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import JobCardSkeleton from "./JobCardSkeleton";

const MainDashboard = () => {
  const userObjectString = localStorage.getItem("user");
  const userObject = JSON.parse(userObjectString);
  const userId = userObject._id;
  const token = userObject.token;

  const [jobs, setJobs] = useState([]);
  const [visibleJobs, setVisibleJobs] = useState(15);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://assist-api-okgk.onrender.com/api/v1/jobs`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const sortedJobs = response.data.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB - dateA;
      });

      setJobs(sortedJobs);
      setFilteredJobs(sortedJobs);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId && token) {
      fetchJobs();
    }
  }, [userId, token]);

  const loadMoreJobs = () => {
    setVisibleJobs((prevVisibleJobs) => prevVisibleJobs + 10);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = jobs.filter((job) => {
      return (
        job.title.toLowerCase().includes(query) ||
        job.skills.join(", ").toLowerCase().includes(query) ||
        job.budget.toString().includes(query) ||
        job.duration.toString().includes(query)
      );
    });

    setFilteredJobs(filtered);
  };

  const formatTimeAgo = (createdAt) => {
    const currentTime = new Date();
    const jobTime = new Date(createdAt);

    const timeDifference = currentTime - jobTime;

    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    const week = 7 * day;
    const month = 30 * day;
    const year = 365 * day;

    if (timeDifference < minute) {
      return "1 second ago";
    } else if (timeDifference < hour) {
      const minutes = Math.floor(timeDifference / minute);
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    } else if (timeDifference < day) {
      const hours = Math.floor(timeDifference / hour);
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    } else if (timeDifference < week) {
      const days = Math.floor(timeDifference / day);
      return `${days} ${days === 1 ? "day" : "days"} ago`;
    } else if (timeDifference < month) {
      const weeks = Math.floor(timeDifference / week);
      return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
    } else if (timeDifference < year) {
      const months = Math.floor(timeDifference / month);
      return `${months} ${months === 1 ? "month" : "months"} ago`;
    } else {
      const years = Math.floor(timeDifference / year);
      return `${years} ${years === 1 ? "year" : "years"} ago`;
    }
  };

  const filterJobs = (tab) => {
    if (tab === "recommended") {
      // Filter jobs for the "Recommended" tab based on your criteria
      // Update the filteredJobs state accordingly
    } else if (tab === "bestmatch") {
      // Filter jobs for the "Best Match" tab based on your criteria
      // Update the filteredJobs state accordingly
    } else {
      setFilteredJobs(jobs);
    }
    setActiveTab(tab);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div>
        <div>
          <h1 className="text-2xl font-bold mb-4 text-center">
            Available Projects
          </h1>

          <div className="flex justify-center my-4 space-x-4">
            <button
              className={`${
                activeTab === "all" ? "bg-blue-500" : "bg-gray-300"
              } text-gray-800 py-2 px-4 rounded hover:bg-blue-600`}
              onClick={() => filterJobs("all")}
            >
              All Jobs
            </button>
            <button
              className={`${
                activeTab === "recommended" ? "bg-blue-500" : "bg-gray-300"
              } text-gray-800 py-2 px-4 rounded hover:bg-blue-600`}
              onClick={() => filterJobs("recommended")}
            >
              Recommended
            </button>
            <button
              className={`${
                activeTab === "bestmatch" ? "bg-blue-500" : "bg-gray-300"
              } text-gray-800 py-2 px-4 rounded hover:bg-blue-600`}
              onClick={() => filterJobs("bestmatch")}
            >
              Best Match
            </button>
          </div>

          <input
            type="text"
            placeholder="Search projects using title, skills, duration, or budget"
            onChange={handleSearch}
            className="p-2 w-full border-2 border-blue-700 rounded-lg"
          />

          <hr className="my-2" />
          {loading ? (
            <JobCardSkeleton />
          ) : (
            <div className="grid grid-cols-1 gap-2">
              {filteredJobs.slice(0, visibleJobs).map((job) => (
                <Link to={`/dashboard/job/${job._id}`} key={job._id}>
                  <div className="bg-blue-100 p-4 mb-2 border border-blue-400 rounded-lg shadow-md">
                    <div className="flex justify-between">
                      <h3 className="text-xl font-semibold">{job.title}</h3>
                      <span className="text-gray-700">
                        {formatTimeAgo(job.createdAt)}
                      </span>
                    </div>
                    <div className="flex justify-start gap-4 items-center">
                      <span className="text-blue-600 hover:underline">
                        Budget: Ksh.{job.budget}
                      </span>
                      <span className="text-blue-600 hover:underline">
                        Duration: {job.duration} days
                      </span>
                    </div>
                    <p className="text-gray-600 my-2">{job.description}</p>
                    <div className="mt-4">
                      <p className="text-gray-700">
                        Skills: {job.skills.join(", ")}
                      </p>
                      <p className="text-gray-700">Bids: {job.bids.length}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {visibleJobs < filteredJobs.length && (
            <div className="grid place-items-center">
              <button
                onClick={loadMoreJobs}
                className="bg-blue-500 text-center text-white py-2 px-4 mt-4 rounded hover:bg-blue-600"
              >
                Load More...
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
