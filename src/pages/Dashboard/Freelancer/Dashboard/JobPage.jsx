import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Messages from "./jobMessages";
import Product from "./product";

const JobPage = () => {
  const userObjectString = localStorage.getItem("user");
  const userObject = JSON.parse(userObjectString);
  const email = userObject.email;
  const { jobId } = useParams();
  const [job, setJob] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [bidAmount, setBidAmount] = useState("");
  const [proposal, setProposal] = useState("");
  const [files, setFiles] = useState([]);
  const [isBidding, setIsBidding] = useState(false);
  const navigate = useNavigate();
  const [hasPlacedBid, setHasPlacedBid] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [bidId, setBidId] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(
          `https://assist-api-okgk.onrender.com/api/v1/jobs/${jobId}`
        );

        setJob(response.data);
        setIsLoading(false);

        console.log(job);

        const userBid = response.data.bids.find((bid) => bid.email === email);
        if (userBid) {
          setHasPlacedBid(true);
          setBidId(userBid._id);
        }
      } catch (error) {
        console.error("Failed to fetch job details:", error);
        setIsLoading(false);
      }
    };

    fetchJob();
  }, [jobId, email, hasPlacedBid]);

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
      formData.append("email", email);
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
          },
        }
      );

      console.log("Bid placed successfully:", response.data);
      setHasPlacedBid(true);
      setMessage("Bid placed successfully");
    } catch (error) {
      console.error("Failed to place bid:", error);
      setMessage({ error: error.message });
    } finally {
      setIsBidding(false);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    if (bidAmount.trim() === "" || proposal.trim() === "") {
      alert("Please enter both bid amount and a proposal.");
      return;
    }

    setIsBidding(true);

    try {
      const formData = new FormData();
      formData.append("price", bidAmount);
      formData.append("email", email);
      formData.append("proposal", proposal);
      for (const file of files) {
        formData.append("files", file);
      }

      const response = await axios.patch(
        `https://assist-api-okgk.onrender.com/api/v1/update-bid/${jobId}/${bidId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Bid updated successfully:", response.data);
      setHasPlacedBid(true);
      setIsEditing(false);
      setMessage("Bid updated successfully");
    } catch (error) {
      console.error("Failed to update bid:", error);
      setMessage({ error: error.message });
    } finally {
      setIsBidding(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

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
      </h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-white py-4 px-2">
          <h3 className="text-lg font-semibold">{job.title}</h3>
          <p className="flex gap-10 py-2">
            <p className="text-gray-600">
              <span className="font-semibold">Budget: </span>
              {job.budget}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Bids: </span>
              {job.bids.length}
            </p>{" "}
            <p className="text-gray-600">
              <span className="font-semibold">Duration: </span>
              {job.duration} days
            </p>{" "}
          </p>
          <p className="text-gray-600">{job.description}</p>
          <p className="text-gray-600">Skills: {job.skills.join(", ")}</p>
          <p className="text-gray-600">Files: {job.files.length}</p>
          <ul className="w-full h-fit border-dotted border-4 py-2 px-4 rounded-lg my-2">
            {job.files.map((file, index) => (
              <li key={index} className="hover:underline">
                {file._id ? (
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
        </div>
      )}

      <hr />

      <div className="bg-white p-4 border border-gray-300 rounded-lg mt-4">
        <h3 className="text-lg font-semibold mb-2">
          {hasPlacedBid ? "You have already placed a bid" : "Place Your Bid"}
        </h3>
        <form onSubmit={hasPlacedBid ? handleEdit : handleBidSubmit}>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center">
              <label htmlFor="bidAmount" className="text-gray-600">
                Bid Amount
              </label>
              <input
                type="number"
                id="bidAmount"
                name="bidAmount"
                placeholder="Enter your bid amount"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md mt-2"
                required
                disabled={hasPlacedBid && !isEditing}
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
                disabled={hasPlacedBid && !isEditing}
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
                disabled={hasPlacedBid && !isEditing}
              />
            </div>
            {message && <span className="text-green-500">{message}</span>}
            <div className="flex gap-3">
              <button
                type="submit"
                className={`bg-blue-500 text-white p-2 rounded-md mt-4 w-40 hover:bg-blue-600 ${
                  isBidding ? "cursor-not-allowed opacity-50" : ""
                }`}
                disabled={isBidding || (hasPlacedBid && !isEditing)}
              >
                {hasPlacedBid
                  ? isEditing
                    ? "Save Changes"
                    : "Bid Placed"
                  : isBidding
                  ? "Placing Bid..."
                  : "Place Bid"}
              </button>
              {hasPlacedBid && !isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="py-2 px-4 bg-blue-200 w-40 mt-4 rounded-md hover:bg-blue-400"
                >
                  Edit Bid
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      {job.stage === "Ongoing" &&
      hasPlacedBid &&
      job.bids.find(
        (bid) => bid.email === email && bid.status === "Ongoing"
      ) ? (
        <div>
          <Messages />
          <Product />
        </div>
      ) : null}
    </div>
  );
};

export default JobPage;
