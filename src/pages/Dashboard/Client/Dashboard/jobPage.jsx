import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

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
        { status: "Ongoing" }
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
    <div className="p-4 mt-14 max-w-4xl mx-auto">
      <p
        className="underline font-semibold my-2 cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        Go Back
      </p>
      <h2 className="text-2xl font-semibold mb-4">Project Details</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-white p-4 border border-gray-300 rounded-lg">
          <h3 className="text-2xl font-semibold">{job.title}</h3>
          <p className="text-gray-600">{job.description}</p>
          <p className="text-gray-600">
            <span className="font-semibold">Budget: </span>
            {job.budget}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Status: </span>
            {job.status}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Duration: </span>
            {job.duration} days
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Skills: </span>
            {job.skills.join(", ")}
          </p>
          <p className="text-gray-600">
            {job.files && job.files.length > 0 ? (
              <div>
                <h3 className="text-lg font-semibold">Files:</h3>
                {job.files.map((file) => (
                  <div key={file._id}>
                    <a
                      href={file.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {file.title}
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No files available for this job.</p>
            )}
          </p>
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
                        Bid by {bid.user_email}
                      </h3>
                      <p className="text-gray-600">
                        <span className="font-semibold">Proposal: </span>
                        {bid.proposal}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">Budget: </span>
                        {bid.budget}
                      </p>
                      {bid.files && bid.files.length > 0 && (
                        <div>
                          <h3 className="text-sm font-semibold">Bid Files:</h3>
                          {bid.files.map((file) => (
                            <div key={file._id}>
                              <a
                                href={file.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                              >
                                {file.title}
                              </a>
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
        </div>
      )}
    </div>
  );
};

export default JobPage;
