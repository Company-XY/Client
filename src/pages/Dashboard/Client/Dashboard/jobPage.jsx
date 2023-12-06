import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Messages from "./jobMessages";

const JobPage = () => {
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
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [selectedBidId, setSelectedBidId] = useState(null);
  const [selectedBidLoading, setSelectedBidLoading] = useState(false);
  const [selectedBidError, setSelectedBidError] = useState(null);

  const handleSelectBid = (bid) => {
    if (selectedBidId === bid._id) {
      setSelectedBidId(null);
    } else {
      setSelectedBidId(bid._id);
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
        `https://assist-api-5y59.onrender.com/api/v1/jobs/${jobId}/review`,
        { review },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      setError(error.response.data.message || "Failed to submit review");
      throw error;
    }
  };

  const handleRating = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `https://assist-api-5y59.onrender.com/api/v1/jobs/${jobId}/rating`,
        { rating },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      setError(error.response.data.message || "Failed to submit rating");
      throw error;
    }
  };

  const handleApproveProject = async () => {
    try {
      setLoading(true);

      const approveResponse = await axios.patch(
        `https://assist-api-5y59.onrender.com/api/v1/jobs/${jobId}/approve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (approveResponse.status === 200) {
        await handleRating();
        await handleReview();
        setSuccess(true);
        setLoading(false);
      }
    } catch (error) {
      setError(error.response.data.message || "Failed to approve project");
      setLoading(false);
      throw error;
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
      setError(
        error.response.data.message || "Failed to dispute project, try again"
      );
    }
  };

  const FreelancerDetails = ({ bid }) => {
    const { email } = bid;

    const [userDetails, setUserDetails] = useState(null);
    const [loading2, setLoading2] = useState(true);

    useEffect(() => {
      const fetchFreelancerDetails = async () => {
        try {
          setLoading2(true);
          const response = await axios.get(
            `https://assist-api-5y59.onrender.com/api/v1/users/list`
          );

          const freelancerUser = response.data.find(
            (user) => user.role === "Freelancer" && user.email === email
          );

          if (freelancerUser) {
            setUserDetails(freelancerUser);
          }

          setLoading2(false);
        } catch (error) {
          setLoading2(false);
        }
      };

      fetchFreelancerDetails();
    }, [email]);

    return userDetails ? (
      <div className="bg-white p-4 rounded-lg shadow-md -mt-12">
        <h2 className="text-xl font-semibold mb-2 text-blue-700 text-center">
          About {userDetails.name}
        </h2>
        <p className="mb-2">{userDetails.bio}</p>
        <p className="mb-2">Experience: {userDetails.experience}</p>
        <p className="mb-2">Rating: {userDetails.rating}</p>
        <p className="mb-2">
          <span className="mb-2 flex space-x-1">
            <span>{userDetails.location.city},</span>
            <span>{userDetails.location.country.code}</span>
          </span>
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Skills: </span>
          {userDetails.skills && userDetails.skills.length > 0
            ? userDetails.skills.map((skill, index) => (
                <span
                  key={index}
                  className="text-blue-700 font-semibold cursor-pointer hover:underline"
                >
                  {skill.label}
                  {index !== userDetails.skills.length - 1 ? ", " : ""}
                </span>
              ))
            : "No skills specified"}
        </p>
      </div>
    ) : (
      <div className="bg-white p-4 rounded-lg shadow-md -mt-10 animate-pulse">
        <h2 className="text-xl font-semibold mb-2 bg-gray-200 h-8 w-2/3"></h2>
        <p className="mb-2 bg-gray-200 h-4 w-3/4"></p>
        <p className="mb-2 bg-gray-200 h-4 w-2/4"></p>
        <p className="mb-2 bg-gray-200 h-4 w-1/4"></p>
        <p className="mb-2 bg-gray-200 h-4 w-3/4"></p>
        <p className="mb-2 bg-gray-200 h-4 w-2/4"></p>
        <p className="text-gray-700">
          <span className="font-semibold bg-gray-200 h-4 w-1/3 inline-block"></span>
          <span className="bg-gray-200 h-4 w-2/3 inline-block"></span>
        </p>
      </div>
    );
  };

  return (
    <div className="py-4 mt-20 max-w-5xl mx-auto">
      <span
        className="font-semibold cursor-pointer py-2 my-6"
        onClick={() => navigate("/dashboard")}
      >
        <span className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-800 text-white">
          Go Back
        </span>
      </span>
      <hr className="my-4" />
      <h2 className="text-2xl font-semibold mb-2 py-2 text-center">
        Project Details
      </h2>{" "}
      {isLoading ? (
        <div className="bg-white py-4">
          <div className="border-2 rounded-lg p-4">
            <div className="h-6 w-3/4 mb-4 bg-gray-300 rounded-lg"></div>
            <div className="text-gray-600 py-1 h-3 bg-gray-300 rounded mb-2"></div>
            <div className="flex flex-col space-y-3">
              <div className="text-gray-600 h-3 bg-gray-300 rounded"></div>
              <div className="text-gray-600 h-3 bg-gray-300 rounded"></div>
              <div className="text-gray-700 h-3 bg-gray-300 rounded"></div>
              <div className="text-gray-600 font-semibold h-3 bg-gray-300 rounded"></div>
              <div className="text-gray-600 font-semibold h-3 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
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
                          <div className="flex">
                            <div className="basis-1/2">
                              <p className="text-gray-600">
                                <span className="font-semibold">
                                  Proposal:{" "}
                                </span>
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
                            <div className="basis-1/2">
                              <FreelancerDetails bid={bid} />
                            </div>
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
                              onClick={() => handleSelectBid(bid)}
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
              <div className="mt-2 text-center">
                Project Ongoing{" "}
                {job.bids.map((bid) => {
                  if (bid.status === "Ongoing") {
                    return (
                      <span key={bid._id} className="font-semibold">
                        Bid Awarded to:{" "}
                        <span className="text-blue-700 cursor-pointer">
                          {bid.name}
                        </span>
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

          {job.stage === "Under Review" || job.stage === "Completed" ? (
            <>
              <div className="border-t border-gray-300 pt-4 mt-3 bg-blue-300 rounded-md">
                <h3 className="text-xl font-semibold my-1 text-center">
                  Project Submission
                </h3>
                <div className="p-4">
                  <p className="text-gray-600">Message: {job.product.review}</p>
                  {job.product.files && job.product.files.length > 0 && (
                    <div className="mt-2">
                      <h3 className="text-md font-semibold mb-1">
                        Project Submissions:
                      </h3>
                      {job.product.files.map((file) => (
                        <div key={file._id} className="mb-2">
                          <a
                            href={`https://assist-api-5y59.onrender.com/api/v1/jobs/${jobId}/files/${file._id}`}
                            target="_blank"
                            rel="noreferrer"
                            download
                            className="hover:underline font-semibold text-blue-500 hover:text-blue-700"
                          >
                            {file.filename}
                          </a>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : null}
          {job.stage === "Under Review" && (
            <div className="flex flex-col gap-4 mt-4">
              <form className="flex flex-col gap-1">
                <div className="mb-2">
                  <label htmlFor="review" className="flex flex-col">
                    <span className="text-md font-semibold">
                      Project Review
                    </span>
                    <span> Add a review for the project</span>
                  </label>
                  <textarea
                    id="review"
                    name="review"
                    value={review}
                    placeholder="Enter your review..."
                    className="w-full border-2 rounded-md border-blue-700 py-2 px-4"
                    onChange={(e) => setReview(e.target.value)}
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="rating" className="flex flex-col">
                    <span className="text-md font-semibold">
                      Freelancer Rating
                    </span>
                    <span>
                      {" "}
                      Add a rating for the freelancer in a scale of 1 - 5
                    </span>
                  </label>
                  <input
                    type="number"
                    id="rating"
                    name="rating"
                    value={rating}
                    placeholder="Rating"
                    min="1"
                    max="5"
                    step="0.5"
                    className="w-full border-2 rounded-md border-blue-700 py-2 px-4"
                    onChange={(e) => setRating(e.target.value)}
                  />
                </div>
              </form>
              {success ? (
                <div className="flex items-center justify-center space-x-2 bg-green-200 text-green-700 font-semibold px-4 py-2 rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 inline-block"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Project Approved</span>
                </div>
              ) : (
                <>
                  <>
                    {error && (
                      <span className="font-semibold text-red-700 bg-red-200 w-full p-2 my-2">
                        {error}
                      </span>
                    )}
                  </>
                  <div className="flex space-x-10">
                    <button
                      onClick={handleApproveProject}
                      className={`py-2 px-4 w-40 bg-green-500 rounded-lg text-white font-semibold ${
                        loading
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-green-700 cursor-pointer"
                      }`}
                      disabled={loading}
                    >
                      {loading ? (
                        <span>Please Wait</span>
                      ) : (
                        <span>Approve</span>
                      )}
                    </button>
                    <button
                      onClick={handleDisputeProject}
                      className={`py-2 px-4 w-40 bg-red-500 rounded-lg text-white font-semibold ${
                        loading
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-red-700 cursor-pointer"
                      }`}
                      disabled={loading}
                    >
                      {loading ? (
                        <span>Please Wait</span>
                      ) : (
                        <span>Dispute</span>
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
          {job.stage === "Complete" && (
            <>
              <div className="p-2">
                {job.product.files && job.product.files.length > 0 && (
                  <div className="mt-2">
                    <h3 className="text-md font-semibold mb-1">
                      Project Submissions
                    </h3>
                    {job.product.files.map((file) => (
                      <div key={file._id} className="mb-2">
                        <a
                          href={`https://assist-api-5y59.onrender.com/api/v1/jobs/${jobId}/files/${file._id}`}
                          target="_blank"
                          rel="noreferrer"
                          download
                          className="hover:underline font-semibold text-blue-500 hover:text-blue-700"
                        >
                          {file.filename}
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="my-2 flex items-center justify-center space-x-2 bg-green-200 text-green-700 font-semibold px-4 py-2 rounded-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 inline-block"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Project Completed and Approved</span>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default JobPage;
