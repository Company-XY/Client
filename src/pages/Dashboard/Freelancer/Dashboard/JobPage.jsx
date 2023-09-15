import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const JobPage = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [bidAmount, setBidAmount] = useState("");
  const [isBidding, setIsBidding] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(
          `https://assist-api-okgk.onrender.com/api/v1/jobs/${jobId}`
        );

        setJob(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch job details:", error);
        setIsLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  const handleBidSubmit = async (e) => {
    e.preventDefault();

    if (bidAmount.trim() === "") {
      alert("Please enter a bid amount.");
      return;
    }

    setIsBidding(true);

    try {
      const response = await axios.post(
        `https://assist-api-okgk.onrender.com/api/v1/jobs/${jobId}/bids`,
        {
          amount: bidAmount,
        }
      );

      console.log("Bid placed successfully:", response.data);
    } catch (error) {
      console.error("Failed to place bid:", error);
    } finally {
      setIsBidding(false);
    }
  };

  return (
    <div className="p-4 mt-14">
      <h2 className="text-2xl font-semibold mb-4">Job Details</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-white p-4 border border-gray-300 rounded-lg">
          <h3 className="text-lg font-semibold">{job.title}</h3>
          <p className="text-gray-600">{job.description}</p>
          <p className="text-gray-600">Budget: {job.budget}</p>
          <p className="text-gray-600">Bids: {job.bids}</p>
          <p className="text-gray-600">Duration: {job.duration} days</p>
          <p className="text-gray-600">Skills: {job.skills}</p>
          <p className="text-gray-600">Files: {job.files}</p>
          <form onSubmit={handleBidSubmit} className="mt-4">
            <div className="flex items-center">
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="Enter your bid amount"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                className="w-40 p-2 border border-gray-300 rounded-md mr-2"
                required
              />
              <button
                type="submit"
                className={`bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 ${
                  isBidding ? "cursor-not-allowed opacity-50" : ""
                }`}
                disabled={isBidding}
              >
                {isBidding ? "Placing Bid..." : "Place Bid"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default JobPage;
