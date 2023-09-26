import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const JobPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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
  }, [jobId]);

  return (
    <div className="p-4 mt-14">
      <p
        className="underline font-semibold my-2 cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        Back to Dashboard
      </p>
      <h2 className="text-2xl font-semibold mb-4">Job Details</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-white p-4 border border-gray-300 rounded-lg">
          <h3 className="text-lg font-semibold">{job.title}</h3>
          <p className="text-gray-600">{job.description}</p>
          <p className="text-gray-600">
            <span className="font-semibold">Budget: </span>
            {job.budget}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Duration: </span>
            {job.duration} days
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Skills: </span>
            {job.skills}
          </p>
          <p className="text-gray-600">Files: {job.files}</p>
          <div>
            <h2 className="text-gray-600 mt-4">Bids: {job.bids}</h2>
            <div>Individual bid details to appear here</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobPage;
