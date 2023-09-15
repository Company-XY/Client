import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const JobPage = () => {
  const { jobId } = useParams();
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
        </div>
      )}
    </div>
  );
};

export default JobPage;
