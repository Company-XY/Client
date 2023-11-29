import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Messages from "./jobMessages";
import Product from "./product";

const JobPage = () => {
  const userObjectString = localStorage.getItem("user");
  const userObject = JSON.parse(userObjectString);
  const email = userObject.email;
  const name = userObject.name;
  const token = userObject.token;
  const { jobId } = useParams();

  const [job, setJob] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [bidAmount, setBidAmount] = useState("");
  const [proposal, setProposal] = useState("");
  const [isBidding, setIsBidding] = useState(false);
  const [targetPrice, setTargetPrice] = useState(0);
  const navigate = useNavigate();
  const [hasPlacedBid, setHasPlacedBid] = useState(false);
  const [message, setMessage] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const maxFiles = 5;

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);

    if (uploadedFiles.length + newFiles.length > maxFiles) {
      alert(`You can only upload a maximum of ${maxFiles} files.`);
      return;
    }

    setUploadedFiles([...uploadedFiles, ...newFiles]);
  };

  const handleFileRemove = (index) => {
    const updatedFiles = [...uploadedFiles];
    updatedFiles.splice(index, 1);
    setUploadedFiles(updatedFiles);
  };

  const renderUploadedFiles = () => {
    return (
      <div className="flex flex-wrap">
        {uploadedFiles.map((file, index) => (
          <div key={index} className="mb-2 mr-2">
            <p>{file.name}</p>
            <button
              className="text-red-600 hover:text-red-800"
              onClick={() => handleFileRemove(index)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    );
  };

  const calculateTargetPrice = (amount) => {
    const parsedAmount = parseFloat(amount);
    if (!isNaN(parsedAmount)) {
      const calculatedPrice = parsedAmount * 0.9;
      setTargetPrice(calculatedPrice.toFixed(2));
    } else {
      setTargetPrice(0);
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

        const userBid = response.data.bids.find((bid) => bid.email === email);
        if (userBid) {
          setHasPlacedBid(true);
        }
      } catch (error) {
        console.error("Failed to fetch job details:", error);
        setIsLoading(false);
      }
    };

    fetchJob();
  }, [jobId, email, hasPlacedBid, message]);

  const handleBidSubmit = async (e) => {
    e.preventDefault();
    setIsBidding(true);

    const bidData = {
      price: bidAmount,
      name,
      email,
      proposal,
    };

    try {
      const bidResponse = await axios.post(
        `https://assist-api-5y59.onrender.com/api/v1/jobs/${jobId}/create`,
        bidData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      {
        /*const newBidId = bidResponse.data._id;

      console.log(newBidId);

      const formDataFiles = new FormData();
      uploadedFiles.forEach((file) => {
        formDataFiles.append("files", file);
      });

      console.log(formDataFiles);

      const filesResponse = await axios.patch(
        `https://assist-api-5y59.onrender.com/api/v1/job/${jobId}/bids/${newBidId}/files`,
        formDataFiles,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(filesResponse.data);*/
      }
      setIsBidding(false);
      setSuccess(true);
      setMessage("Bid placed successfully");
      setHasPlacedBid(true);
    } catch (error) {
      console.error("Error submitting bid:", error);
      setIsBidding(false);
    }
  };

  return (
    <div className="py-4 mt-14 max-w-5xl mx-auto">
      <span
        className="font-semibold cursor-pointer py-2 mt-6 "
        onClick={() => navigate("/dashboard")}
      >
        <span className="px-4 py-2 mt-2 rounded-lg bg-blue-600 hover:bg-blue-700 hover:text-white">
          Go Back
        </span>
      </span>
      <hr className="my-4" />
      <h2 className="text-2xl font-semibold mb-2 py-2 text-center">
        Project Details
      </h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-white py-4">
          <div className="border-2 rounded-lg p-4">
            <h3 className="text-base md:text-xl font-semibold text-blue-700">
              {job.title}
            </h3>{" "}
            <p className="text-gray-600 py-1">{job.description}</p>
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
            <p className="text-gray-600 font-semibold">
              Files:{" "}
              <span className="text-blue-700 font-semibold">
                {job.files.length}
              </span>
            </p>{" "}
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
        </div>
      )}

      <hr />
      {job.stage === "Pending" && (
        <div className="bg-white p-4 border border-gray-300 rounded-lg mt-4">
          <h3 className="text-lg font-semibold mb-2">
            {hasPlacedBid ? "You have already placed a bid" : "Place Your Bid"}
          </h3>
          <form onSubmit={handleBidSubmit}>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex flex-col items-start">
                <label
                  htmlFor="bidAmount"
                  className="text-blue-800 font-semibold"
                >
                  Bid Amount
                </label>
                <p>What is your budget to deliver on the project</p>
                <input
                  type="number"
                  id="bidAmount"
                  name="bidAmount"
                  placeholder="Enter your bid amount"
                  value={bidAmount}
                  onChange={(e) => {
                    setBidAmount(e.target.value);
                    calculateTargetPrice(e.target.value);
                  }}
                  className="w-full p-2 border border-gray-300 rounded-md mt-2 focus:ring focus:ring-blue-800 focus:outline-none"
                  required
                  disabled={hasPlacedBid}
                />
              </div>
              <div className="my-1">
                <p className="font-semibold">
                  If the bid is accepted you will receive:
                  <span className="text-blue-800"> Ksh. {targetPrice}</span>
                </p>
              </div>
              <div className="flex flex-col items-start">
                <label
                  htmlFor="proposal"
                  className="text-blue-800 font-semibold"
                >
                  Bid Proposal
                </label>
                <p>
                  Provide a brief detail of how well you can handle the project.
                </p>
                <textarea
                  id="proposal"
                  name="proposal"
                  placeholder="Enter your bid proposal"
                  value={proposal}
                  onChange={(e) => setProposal(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md mt-2 focus:ring focus:ring-blue-800 focus:outline-none"
                  required
                  disabled={hasPlacedBid}
                />
              </div>
              <div className="flex flex-col items-start">
                <label htmlFor="files" className="text-blue-800 font-semibold">
                  Bid Files
                </label>
                <p>
                  Attach any relevant files that may make your proposal stand
                  out
                </p>
                <input
                  type="file"
                  id="files"
                  name="files"
                  onChange={handleFileChange}
                  className="w-full p-2 border border-gray-300 rounded-md mt-2 focus:ring focus:ring-blue-800 focus:outline-none"
                  required
                  accept=".pdf, .doc, .docx"
                  multiple
                  disabled={hasPlacedBid}
                />
              </div>
              {renderUploadedFiles()}
              {message && <span className="text-green-500">{message}</span>}
              <div className="flex justify-between">
                <div className="flex justify-start space-x-5">
                  <button
                    type="submit"
                    className={`bg-blue-500 text-white p-2 rounded-md mt-4 w-40 items-center hover:bg-blue-600 ${
                      isBidding ? "cursor-not-allowed opacity-50" : ""
                    }`}
                    disabled={isBidding || hasPlacedBid}
                  >
                    {hasPlacedBid
                      ? "Bid Placed"
                      : isBidding
                      ? "Placing Bid..."
                      : "Place Bid"}
                  </button>
                </div>
                <button
                  className="bg-blue-300 font-semibold hover:text-white p-2 rounded-md mt-4 w-40 items-center hover:bg-blue-600"
                  onClick={() => navigate("/dashboard")}
                >
                  Go Back
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
      {job.stage === "Ongoing" && (
        <div className="flex flex-col space-y-4 my-5">
          <Messages />
          <Product />
        </div>
      )}
      {job.stage === "UnderReview" && (
        <div className="p-2 m-2 grid place-items-center bg-green-500 rounded-lg">
          <span className="font-semibold">
            Product Successfully Submitted and Under Review
          </span>
        </div>
      )}
    </div>
  );
};

export default JobPage;
