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

  const handleAwardProject = async (bidId) => {
    try {
      await axios.patch(
        `https://assist-api-okgk.onrender.com/api/v1/update-bid/${jobId}/${bidId}`,
        { status: "Ongoing" }
      );

      await axios.patch(
        `https://assist-api-okgk.onrender.com/api/v1/jobs/${jobId}`,
        { stage: "Ongoing" }
      );
      setAwarded(true);
      console.log("Bid and job awarded successfully.");
    } catch (error) {
      console.error("Failed to award the project:", error);
    }
  };

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(
          `https://assist-api-okgk.onrender.com/api/v1/jobs/${jobId}`
        );

        setJob(response.data);
        console.log(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch job details:", error);
        setIsLoading(false);
      }
    };

    fetchJob();
  }, [jobId, awarded]);

  return (
    <div className="py-4 mt-14 max-w-5xl mx-auto">
      <span
        className="underline font-semibold cursor-pointer py-2 my-6"
        onClick={() => navigate("/dashboard")}
      >
        Go Back
      </span>
      <hr className="my-4" />
      <h2 className="text-2xl font-semibold mb-2 py-2 text-center">
        Project Details
      </h2>{" "}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-white py-4 px-2">
          <h3 className="text-lg font-semibold">{job.title}</h3>
          <p className="text-gray-600">{job.description}</p>
          <p className="text-gray-600">
            <span className="font-semibold">Budget: </span>
            {job.budget}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Status: </span>
            {job.stage}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Duration: </span>
            {job.duration} days
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Skills: </span>
            {job.skills.join(", ")}
          </p>
          <ul className="w-full h-fit border-dotted border-4 py-2 px-4 rounded-lg my-2">
            {" "}
            Files
            {job.files.map((file, index) => (
              <li key={index} className="hover:underline">
                {file.__id ? (
                  <a
                    href={`https://assist-api-okgk.onrender.com/api/v1/download/${jobId}/${file._id}`}
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
          {job.stage === "Pending" && (
            <div>
              {job.bids ? (
                <div>
                  <h2 className="text-gray-600 mt-4">
                    {awarded ? "Awarded Bid" : "Bids"}
                  </h2>
                  {job.bids
                    .filter((bid) => !awarded || bid.status === "Ongoing")
                    .map((bid) => (
                      <div
                        key={bid._id}
                        className="bg-gray-100 p-4 mt-4 border border-gray-300 rounded-md"
                      >
                        <h3 className="text-lg font-semibold">
                          Bid by {bid.email}
                        </h3>
                        <p className="text-gray-600">
                          <span className="font-semibold">Proposal: </span>
                          {bid.proposal}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-semibold">Budget: </span>
                          {bid.price}
                        </p>
                        {bid.files && bid.files.length > 0 && (
                          <div>
                            <h3 className="text-sm font-semibold">
                              Bid Files:
                            </h3>
                            {bid.files.map((file) => (
                              <div key={file._id}>
                                <span>{file.title}</span>
                              </div>
                            ))}
                          </div>
                        )}
                        <button
                          onClick={() => handleAwardProject(bid._id)}
                          disabled={awarded}
                          className={`py-2 px-4 w-40 bg-blue-400 rounded-lg ${
                            awarded
                              ? "bg-gray-400 cursor-not-allowed"
                              : "hover:bg-blue-600 cursor-pointer"
                          } my-2`}
                        >
                          {awarded ? (
                            <span>Awarded</span>
                          ) : (
                            <span>Award Project</span>
                          )}
                        </button>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="font-semibold">No bids available for this job.</p>
              )}
            </div>
          )}
          {job.stage === "Ongoing" && (
            <div>
              Project Ongoing. Bid Awarded to:{" "}
              <span className="font-semibold ">{job.bids[0].email}</span>
              <div className="py-2 px-10">
                <Messages />
              </div>
            </div>
          )}
          {job.stage === "UnderReview" ||
            (job.stage === "Completed" && <div>{job.product}</div>)}
        </div>
      )}
    </div>
  );
};

export default JobPage;
