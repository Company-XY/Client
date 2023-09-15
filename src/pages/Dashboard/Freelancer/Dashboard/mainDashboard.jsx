import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const MainDashboard = () => {
  const userObjectString = localStorage.getItem("user");
  const userObject = JSON.parse(userObjectString);
  const userId = userObject._id;
  const token = userObject.token;

  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState({
    budget: "",
    duration: "",
    skills: "",
    search: "",
  });

  const fetchJobs = async () => {
    try {
      const response = await axios.get(
        `https://assist-api-okgk.onrender.com/api/v1/jobs`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setJobs(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchJobs();
  };

  useEffect(() => {
    if (userId && token) {
      fetchJobs();
    }
  }, [userId, token]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Job Listings</h1>
      <form onSubmit={handleFilterSubmit} className="mb-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="budget">Budget:</label>
            <input
              type="text"
              id="budget"
              name="budget"
              value={filter.budget}
              onChange={handleFilterChange}
              className="border border-gray-300 rounded p-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="duration">Duration:</label>
            <input
              type="text"
              id="duration"
              name="duration"
              value={filter.duration}
              onChange={handleFilterChange}
              className="border border-gray-300 rounded p-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="skills">Skills:</label>
            <input
              type="text"
              id="skills"
              name="skills"
              value={filter.skills}
              onChange={handleFilterChange}
              className="border border-gray-300 rounded p-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="search">Search:</label>
            <input
              type="text"
              id="search"
              name="search"
              value={filter.search}
              onChange={handleFilterChange}
              className="border border-gray-300 rounded p-2 w-full"
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 mt-2 rounded hover:bg-blue-600"
        >
          Apply Filters
        </button>
      </form>
      <div className="grid grid-cols-1 gap-4">
        {jobs.map((job) => (
          <Link to={`/dashboard/job/${job._id}`}>
            <div key={job.id} className="border border-gray-300 rounded p-4">
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <p>Budget: {job.budget}</p>
              <p>Duration: {job.duration}</p>
              <p>Skills required: {job.skills.join(", ")}</p>
              <p>{job.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MainDashboard;
