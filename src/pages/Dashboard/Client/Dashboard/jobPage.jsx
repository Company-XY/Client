import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

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

  const [selectedBidId, setSelectedBidId] = useState(null);
  const [selectedBidLoading, setSelectedBidLoading] = useState(false);
  const [selectedBidError, setSelectedBidError] = useState(null);

  const handleSelectBid = (bidId) => {
    setSelectedBidId(bidId);
    setSelectedBidError(null);
  };

  const handleAwardProject = async (bidId) => {
    try {
      setSelectedBidError(null);
      setSelectedBidLoading(true);
      await axios.patch(
        `https://assist-api-5y59.onrender.com/api/v1/jobs/${jobId}/bids/${bidId}/award`
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
          `https://assist-api-5y59.onrender.com/api/v1/jobs/${jobId}`
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
        { review, rating }
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
        `https://assist-api-5y59.onrender.com/api/v1/jobs/${jobId}/approve`
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
        `https://assist-api-5y59.onrender.com/api/v1/jobs/${jobId}/dispute`
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
          <div>
            <h3 className="text-lg font-semibold">{job.title}</h3>
            <p className="text-gray-600">{job.description}</p>
            <p className="text-gray-600">
              <span className="font-semibold">Budget: </span>
              Ksh. {job.budget}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Status: </span>
              {job.stage}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Duration: </span>
              {job.duration} days
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Skills: </span>
              {job.skills && job.skills.length > 0
                ? job.skills.map((skill, index) => (
                    <span key={index}>
                      {skill.label}
                      {index !== job.skills.length - 1 ? ", " : ""}
                    </span>
                  ))
                : "No skills specified"}
            </p>
            <p className="text-gray-600">Files: {job.files.length}</p>
            <ul className="w-full h-fit border-dotted border-4 py-2 px-4 rounded-lg my-2">
              {job.files.map((file, index) => (
                <li key={index} className="hover:underline">
                  {file._id ? (
                    <a
                      href={`https://assist-api-okgk.onrender.com/api/v1/jobs/download/${jobId}/${file._id}`}
                      target="_blank"
                      rel="noreferrer"
                      download
                    >
                      {file.title}
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
                          <span className="font-semibold">Proposal: </span>
                          {bid.proposal}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-semibold">Budget: </span>
                          {bid.price}
                        </p>

                        {/* Error specific to the selected bid */}
                        {selectedBidId === bid._id && selectedBidError && (
                          <div className="w-full my-2 bg-gray-200 py-2 rounded-md">
                            <p className="p-1 ml-2 font-semibold text-red-500">
                              {selectedBidError}
                            </p>
                          </div>
                        )}

                        {/* Selecting a bid and Awarding */}
                        <button
                          onClick={() => handleSelectBid(bid._id)}
                          className={`py-2 px-4 w-40 bg-blue-400 rounded-lg my-2`}
                        >
                          {selectedBidId === bid._id ? (
                            selectedBidLoading ? (
                              <span>Please Wait</span>
                            ) : (
                              <span>Selected</span>
                            )
                          ) : (
                            <span>Select Bid</span>
                          )}
                        </button>

                        {selectedBidId === bid._id && (
                          <button
                            onClick={() => handleAwardProject(bid._id)}
                            disabled={awarded}
                            className={`py-2 px-4 w-40 bg-blue-400 rounded-lg my-2`}
                          >
                            {selectedBidLoading ? (
                              <span>Please Wait</span>
                            ) : (
                              <span>Award Project</span>
                            )}
                          </button>
                        )}
                      </div>
                    ))}
                </div>
              ) : (
                <p className="font-semibold py-4 pl-2">
                  There are no current bids available for this job.
                </p>
              )}
            </div>
          )}
          {job.stage === "Ongoing" && (
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
                          href={`https://assist-api-okgk.onrender.com/api/v1/product/download/${jobId}/${file._id}`}
                          target="_blank"
                          rel="noreferrer"
                          download
                          className="underline font-semibold"
                        >
                          {file.title}
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
