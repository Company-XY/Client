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
      formData.append("price", bidAmount);
      formData.append("proposal", proposal);
      for (const file of files) {
        formData.append("files", file);
      }

      const response = await axios.post(
        `https://assist-api-okgk.onrender.com/api/v1/place-bid/${jobId}`,
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
    <div className="p-4 mt-14 max-w-5xl mx-auto">
      <span
        className="underline font-semibold cursor-pointer py-2 my-2"
        onClick={() => navigate("/dashboard")}
      >
        Go Back
      </span>
      <h2 className="text-2xl font-semibold mb-4 py-2">Project Details</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-white p-4 border border-gray-300 rounded-lg">
          <h3 className="text-lg font-semibold">{job.title}</h3>
          <p className="text-gray-600">{job.description}</p>
          <p className="text-gray-600">Budget: {job.budget}</p>
          <p className="text-gray-600">Bids: {job.bids.length}</p>
          <p className="text-gray-600">Duration: {job.duration} days</p>
          <p className="text-gray-600">Skills: {job.skills.join(", ")}</p>
          <p className="text-gray-600">Files: {job.files.length}</p>
          <span>Click to download</span>
          <ul>
            {job.files.map((file, index) => (
              <li key={index} className="hover:underline">
                <a
                  href={`https://assist-api-okgk.onrender.com/api/v1//download/${jobId}/${file._id}`}
                  target="_blank"
                  rel="noreferrer"
                  download
                >
                  {file.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <hr />

      <div className="bg-white p-4 border border-gray-300 rounded-lg mt-4">
        <h3 className="text-lg font-semibold mb-2">Place Your Bid</h3>
        <form onSubmit={handleBidSubmit}>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center">
              <label htmlFor="bidAmount" className="text-gray-600">
                Bid Amount
              </label>
              <input
                type="number"
                id="bidAmount"
                name="bidAmount"
                min="0"
                step="10"
                placeholder="Enter your bid amount"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md mt-2"
                required
              />
            </div>
            <div className="flex items-center">
              <label htmlFor="proposal" className="text-gray-600">
                Bid Proposal
              </label>
              <textarea
                id="proposal"
                name="proposal"
                placeholder="Enter your bid proposal"
                value={proposal}
                onChange={(e) => setProposal(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md mt-2"
                required
              />
            </div>
            <div className="flex items-center">
              <label htmlFor="files" className="text-gray-600">
                Attach Files
              </label>
              <input
                type="file"
                id="files"
                name="files"
                multiple
                onChange={handleFileChange}
                className="w-full p-2 border border-gray-300 rounded-md mt-2"
              />
            </div>
            <button
              type="submit"
              className={`bg-blue-500 text-white p-2 rounded-md mt-4 w-40 hover:bg-blue-600 ${
                isBidding ? "cursor-not-allowed opacity-50" : ""
              }`}
              disabled={isBidding}
            >
              {isBidding ? "Placing Bid..." : "Place Bid"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobPage;
