import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserJobs = () => {
  const [userJobs, setUserJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">My Projects</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : userJobs.length === 0 ? (
        <p>No current user projects.</p>
      ) : (
        <div>
          {userJobs.map((job, index) => (
            <Link to={`/dashboard/client/job/${job._id}`} key={index}>
              <div className="bg-white p-4 mb-4 border border-gray-300 rounded-lg">
                <h3 className="text-lg font-semibold flex justify-between">
                  <p>{job.title}</p>
                  <p className="bg-blue-200 p-1 rounded-lg">{job.status}</p>
                </h3>
                <p className="text-gray-600">{job.description}</p>
                <p className="text-gray-600">Budget: {job.budget}</p>
                <p className="text-gray-600">Bids: {job.bids}</p>
                <p className="text-gray-600 flex justify-between">
                  <p>Duration: {job.duration}</p>
                  <p className="bg-blue-400 p-1 rounded-lg">{job.skills}</p>
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserJobs;
