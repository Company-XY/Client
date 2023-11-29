import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Messages from "./jobMessages";

const JobPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [awarded, setAwarded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(1);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const userObjectString = localStorage.getItem("user");
  const userObject = JSON.parse(userObjectString);
  const token = userObject.token;

  const [selectedBidId, setSelectedBidId] = useState(null);
  const [selectedBidLoading, setSelectedBidLoading] = useState(false);
  const [selectedBidError, setSelectedBidError] = useState(null);

  const handleSelectBid = (bidId) => {
    if (selectedBidId === bidId) {
      setSelectedBidId(null);
    } else {
      setSelectedBidId(bidId);
    }
    setSelectedBidError(null);
  };

  const handleAwardProject = async (bidId) => {
    try {
      setSelectedBidError(null);
      setSelectedBidLoading(true);
      await axios.patch(
        `https://assist-api-5y59.onrender.com/api/v1/jobs/${jobId}/bids/${bidId}/award`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAwarded(true);
      setSelectedBidLoading(false);
    } catch (error) {
      setSelectedBidLoading(false);
      setSelectedBidError(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(
          `https://assist-api-5y59.onrender.com/api/v1/jobs/${jobId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setJob(response.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchJob();
  }, [jobId, awarded]);

  const handleReview = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `https://assist-api-5y59.onrender.com/api/v1/review/${jobId}`,
        { review, rating },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Review and rating submitted successfully.", response);
    } catch (error) {
      console.error("Failed to submit review and rating:", error);
    }
  };
  const handleApproveProject = async () => {
    try {
      setLoading(true);
      const response = await axios.patch(
        `https://assist-api-5y59.onrender.com/api/v1/jobs/${jobId}/approve`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDisputeProject = async () => {
    try {
      const response = await axios.patch(
        `https://assist-api-5y59.onrender.com/api/v1/jobs/${jobId}/dispute`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="py-4 mt-16 max-w-5xl mx-auto">
      <span
        className="font-semibold cursor-pointer py-2 my-6"
        onClick={() => navigate("/dashboard")}
      >
        <span className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-800 hover:text-white">
          Go Back
        </span>
      </span>
      <hr className="my-4" />
      <h2 className="text-2xl font-semibold mb-2 py-2 text-center">
        Project Details
      </h2>{" "}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-white py-4 px-2">
          <div className="border-2 rounded-lg p-4">
            <h3 className="text-base md:text-xl font-semibold text-blue-700">
              {job.title}
            </h3>
            <p className="text-gray-600 font-semibold my-1 p-1">
              {job.description}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Budget: </span>
              <span className="text-blue-700">Ksh. {job.budget}</span>
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Status: </span>
              <span className="text-blue-700">{job.stage}</span>
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Duration: </span>
              <span className="text-blue-700">{job.duration} days </span>
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
            <p className="text-gray-600">
              Files:{" "}
              <span className="text-blue-700 font-semibold">
                {job.files.length}
              </span>
            </p>
            <ul className="w-full h-fit border-dotted border-4 py-2 px-4 rounded-lg my-2">
              {job.files.map((file, index) => (
                <li key={index} className="hover:underline text-blue-700">
                  {file._id ? (
                    <a
                      href={`https://assist-api-5y59.onrender.com/api/v1/jobs/${jobId}/download/${file._id}`}
                      target="_blank"
                      rel="noreferrer"
                      download
                    >
                      {file.filename}
                    </a>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
          {job.stage === "Pending" && (
            <div>
              {job.bids && job.bids.length > 0 ? (
                <div>
                  {job.bids
                    .filter((bid) => !awarded || bid.status === "Ongoing")
                    .map((bid) => (
                      <div
                        key={bid._id}
                        className="bg-gray-100 p-4 mt-4 border border-gray-300 rounded-md"
                      >
                        {/* Display bid details */}
                        <h3 className="text-lg font-semibold">
                          Bid by {bid.name}
                        </h3>
                        <p className="text-gray-600">
                          <span className="font-semibold">Budget: </span>
                          {bid.price}
                        </p>

                        {/* Additional details shown on "View Bid" click */}
                        {selectedBidId === bid._id && (
                          <div>
                            <p className="text-gray-600">
                              <span className="font-semibold">Proposal: </span>
                              {bid.proposal}
                            </p>
                            {/* Display bid files */}
                            {bid.files && bid.files.length > 0 && (
                              <div>
                                <h3 className="text-sm font-semibold">
                                  Bid Files:
                                </h3>
                                {bid.files.map((file) => (
                                  <div key={file._id}>
                                    <a
                                      href={`https://assist-api-5y59.onrender.com/api/v1/jobs/bids/${jobId}/${bid._id}/${file._id}`}
                                      target="_blank"
                                      rel="noreferrer"
                                      download
                                      className="underline font-semibold"
                                    >
                                      {file.filename}
                                    </a>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                        {/* Error specific to the selected bid */}
                        {selectedBidId === bid._id && selectedBidError && (
                          <div className="w-full my-2 bg-gray-200 py-2 rounded-md">
                            <p className="p-1 ml-2 font-semibold text-red-500">
                              {selectedBidError}
                            </p>
                          </div>
                        )}
                        <div className="flex justify-start my-2 space-x-4">
                          <div>
                            <button
                              onClick={() => handleSelectBid(bid._id)}
                              className={`py-2 px-4 w-40 rounded-lg text-white ${
                                selectedBidId === bid._id
                                  ? "bg-gray-400"
                                  : "bg-blue-400"
                              }`}
                              disabled={selectedBidLoading || awarded}
                            >
                              {selectedBidId === bid._id ? (
                                <span
                                  onClick={(e) => {
                                    e.stopPropagation(); // Prevents the parent click from firing
                                    handleSelectBid(bid._id); // Handles unselecting the bid
                                  }}
                                >
                                  Back
                                </span>
                              ) : (
                                <span>View Bid</span>
                              )}
                            </button>
                          </div>
                          <div>
                            {selectedBidId === bid._id && (
                              <button
                                onClick={() => handleAwardProject(bid._id)}
                                disabled={awarded}
                                className={`py-2 px-4 w-40 rounded-lg text-white ${
                                  awarded ? "bg-gray-400" : "bg-green-500"
                                }`}
                              >
                                {selectedBidLoading ? (
                                  <span>Please Wait</span>
                                ) : (
                                  <span>Award Bid</span>
                                )}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="font-semibold py-4 pl-2">
                  There are no current bids available for this project.
                </p>
              )}
            </div>
          )}
          {job.stage === "Ongoing" && (
            <>
              <div>
                Project Ongoing.
                {job.bids.map((bid) => {
                  if (bid.status === "Ongoing") {
                    return (
                      <span key={bid._id} className="font-semibold">
                        Bid Awarded to: {bid.name}
                      </span>
                    );
                  }
                  return null;
                })}
              </div>
              <div>
                <Messages jobId={jobId} />
              </div>
            </>
          )}

          {job.stage === "UnderReview" || job.stage === "Completed" ? (
            <div>
              <div>
                <h3 className="text-lg font-semibold">Product:</h3>
                <p className="text-gray-600">Message: {job.product.review}</p>
                {job.product.files && job.product.files.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold">Product Files:</h3>
                    {job.product.files.map((file) => (
                      <div key={file._id}>
                        <a
                          href={`https://assist-api-5y59.onrender.com/api/v1/jobs/${jobId}/files/${file._id}`}
                          target="_blank"
                          rel="noreferrer"
                          download
                          className="underline font-semibold"
                        >
                          {file.filename}
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : null}
          {job.stage === "UnderReview" && (
            <div className="flex flex-col gap-4 mt-4">
              {/*<form className="flex flex-col gap-1">
                <div className="mb-4">
                  <label htmlFor="review" className="text-lg font-semibold">
                    Add A Review
                  </label>
                  <textarea
                    id="review"
                    name="review"
                    placeholder="Enter your review..."
                    className="w-full border-2 rounded-md border-blue-700 py-2 px-4"
                    onChange={(e) => setReview(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="rating" className="text-lg font-semibold">
                    Add a rating (1-5)
                  </label>
                  <p>Rate the job in a scale of 1 - 5</p>
                  <input
                    type="number"
                    id="rating"
                    name="rating"
                    placeholder="Rating"
                    min="1"
                    max="5"
                    step="1"
                    className="w-full border-2 rounded-md border-blue-700 py-2 px-4"
                    onChange={(e) => setRating(e.target.value)}
                  />
                </div>
          </form>*/}
              {success ? (
                <div className="flex space-x-10">
                  <span>Project Approved</span>
                </div>
              ) : (
                <div className="flex space-x-10">
                  <button
                    onClick={handleApproveProject}
                    className={`py-2 px-4 w-40 bg-blue-200 rounded-lg ${
                      loading
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-blue-300"
                    }`}
                    disabled={loading}
                  >
                    {loading ? <span>Please Wait</span> : <span>Approve</span>}
                  </button>
                  <button
                    onClick={handleDisputeProject}
                    className={`py-2 px-4 w-40 bg-red-200 rounded-lg ${
                      loading
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-red-300"
                    }`}
                    disabled={loading}
                  >
                    {loading ? <span>Please Wait</span> : <span>Dispute</span>}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobPage;
