import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const JobPage = () => {
  const userObjectString = localStorage.getItem("user");
  const userObject = JSON.parse(userObjectString);
  const token = userObject.token;
  const { jobId } = useParams();
  const [job, setJob] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [bidAmount, setBidAmount] = useState("");
  const [proposal, setProposal] = useState("");
  const [files, setFiles] = useState([]);
  const [isBidding, setIsBidding] = useState(false);
  const navigate = useNavigate();

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

  const handleBidSubmit = async (e) => {
    e.preventDefault();

    if (bidAmount.trim() === "" || proposal.trim() === "") {
      alert("Please enter both bid amount and a proposal.");
      return;
    }

    setIsBidding(true);

    try {
      const formData = new FormData();
      formData.append("job_id", jobId);
      formData.append("price", bidAmount);
      formData.append("proposal", proposal);
      for (const file of files) {
        formData.append("files", file);
      }

      const response = await axios.post(
        "https://assist-api-okgk.onrender.com/api/v1/place-bid",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Bid placed successfully:", response.data);
    } catch (error) {
      console.error("Failed to place bid:", error);
    } finally {
      setIsBidding(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  return (
    <div className="p-4 mt-14">
      <span
        className="underline font-semibold cursor-pointer py-2 my-2"
        onClick={() => navigate("/dashboard")}
      >
        Go Back
      </span>
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
                step="10"
                placeholder="Enter your bid amount"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                className="w-40 p-2 border border-gray-300 rounded-md mr-2"
                required
              />
              <input
                type="text"
                placeholder="Enter your bid proposal"
                value={proposal}
                onChange={(e) => setProposal(e.target.value)}
                className="w-40 p-2 border border-gray-300 rounded-md mr-2"
                required
              />
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="mr-2"
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
