import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import JobCardSkeleton from "./JobCardSkeleton";
import Profile from "./profileSection";

const MainDashboard = () => {
  const userObjectString = localStorage.getItem("user");
  const userObject = JSON.parse(userObjectString);
  const userId = userObject._id;
  const token = userObject.token;
  const userEmail = userObject.email;

  const [jobs, setJobs] = useState([]);
  const [visibleJobs, setVisibleJobs] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [tabCounts, setTabCounts] = useState({
    all: 0,
    mybids: 0,
    activeBids: 0,
    completedJobs: 0,
  });

  const fetchJobs = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "https://assist-api-okgk.onrender.com/api/v1/jobs",
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
      setLoading(false);
      const pendingJobs = sortedJobs.filter((job) => job.stage === "Pending");
      setFilteredJobs(pendingJobs);
      setTabCounts({ ...tabCounts, all: pendingJobs.length });
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      setLoading(false);
    }
  };

  const countTabJobs = () => {
    const myBids = jobs.filter(
      (job) =>
        job.stage === "Pending" &&
        job.bids.some((bid) => bid.email === userEmail)
    );

    const activeBids = jobs.filter(
      (job) =>
        (job.stage === "Ongoing" ||
          job.stage === "UnderReview" ||
          job.stage === "Disputed") &&
        job.bids.some(
          (bid) => bid.email === userEmail && bid.status === "Ongoing"
        )
    );

    const completedJobs = jobs.filter(
      (job) =>
        job.stage === "Completed" &&
        job.bids.some((bid) => bid.email === userEmail)
    );

    setTabCounts({
      ...tabCounts,
      mybids: myBids.length,
      activeBids: activeBids.length,
      completedJobs: completedJobs.length,
    });
  };

  useEffect(() => {
    if (userId && token) {
      fetchJobs();
    }
  }, [userId, token]);

  useEffect(() => {
    countTabJobs();
  }, [jobs, userEmail]);

  const loadMoreJobs = () => {
    setVisibleJobs((prevVisibleJobs) => prevVisibleJobs + 10);
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

  const filterActiveBids = () => {
    const activeBids = jobs.filter(
      (job) =>
        (job.stage === "Ongoing" ||
          job.stage === "UnderReview" ||
          job.stage === "Disputed") &&
        job.bids.some(
          (bid) => bid.email === userEmail && bid.status === "Ongoing"
        )
    );
    setFilteredJobs(activeBids);
    setTabCounts({ ...tabCounts, activeBids: activeBids.length });
  };

  const filterCompletedJobs = () => {
    const completedJobs = jobs.filter(
      (job) =>
        job.stage === "Completed" &&
        job.bids.some((bid) => bid.email === userEmail)
    );
    setFilteredJobs(completedJobs);
    setTabCounts({ ...tabCounts, completedJobs: completedJobs.length });
  };

  const filterJobs = (tab) => {
    if (tab === "all") {
      const pendingJobs = jobs.filter((job) => job.stage === "Pending");
      setFilteredJobs(pendingJobs);
    } else if (tab === "mybids") {
      const myBids = jobs.filter(
        (job) =>
          job.stage === "Pending" &&
          job.bids.some((bid) => bid.email === userEmail)
      );
      setFilteredJobs(myBids);
    } else if (tab === "activeBids") {
      filterActiveBids();
    } else if (tab === "completedJobs") {
      filterCompletedJobs();
    }
    setActiveTab(tab);
  };

  return (
    <div className="max-w-6xl mx-auto py-4">
      <div className="md:flex">
        <div className="block md:basis-4/5">
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
              All Jobs ({tabCounts.all})
            </button>
            <button
              className={`${
                activeTab === "mybids" ? "bg-blue-500" : "bg-gray-300"
              } text-gray-800 py-2 px-4 rounded hover:bg-blue-600`}
              onClick={() => filterJobs("mybids")}
            >
              My Bids ({tabCounts.mybids})
            </button>
            <button
              className={`${
                activeTab === "activeBids" ? "bg-blue-500" : "bg-gray-300"
              } text-gray-800 py-2 px-4 rounded hover:bg-blue-600`}
              onClick={() => filterJobs("activeBids")}
            >
              Active Bids ({tabCounts.activeBids})
            </button>
            <button
              className={`${
                activeTab === "completedJobs" ? "bg-blue-500" : "bg-gray-300"
              } text-gray-800 py-2 px-4 rounded hover:bg-blue-600`}
              onClick={() => filterJobs("completedJobs")}
            >
              Completed Jobs ({tabCounts.completedJobs})
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
                className="bg-blue-500 text-center text-white py-2 px-4 mt-4 rounded hover.bg-blue-600"
              >
                Load More...
              </button>
            </div>
          )}
        </div>
        <div className="hidden md:flex basis-1/5">
          <Profile />
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
