import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const FileUpload = () => {
  const { jobId } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  const email = user.email;
  const name = user.name;

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const files = e.target.files;
    setSelectedFiles([...selectedFiles, ...files]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      name,
      email,
    };

    try {
      const jobResponse = await axios.post(
        `https://assist-api-5y59.onrender.com/api/v1/jobs/${jobId}/submit`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const formDataFiles = new FormData();

      selectedFiles.forEach((file) => {
        formDataFiles.append("files", file);
      });

      const filesResponse = await axios.patch(
        `https://assist-api-5y59.onrender.com/api/v1/jobs/${jobId}/files/product`,
        formDataFiles,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setLoading(false);
      setSuccess(true);
      setMessage("Files and Details Submitted Successfully");
    } catch (error) {
      setLoading(false);
      setSuccess(false);
      setError(error.response.data.message || "Unknown error occurred");
    }
  };

  const isSubmitDisabled = selectedFiles.length === 0;

  return (
    <div className="bg-blue-100 p-4 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Submit Project
      </h2>
      <div className="mb-4">
        <input
          type="file"
          accept=".pdf, .doc, .docx"
          onChange={handleFileChange}
          className="border-2 rounded-md border-blue-700 w-full py-2 border-dashed px-4"
          multiple
        />
      </div>
      {selectedFiles.length > 0 && (
        <div className="mb-4">
          <p className="text-lg font-semibold">Selected Files:</p>
          {selectedFiles.map((file, index) => (
            <p key={index}>{file.name}</p>
          ))}
        </div>
      )}
      {success && <div>{message}</div>}
      {error && <div>{error}</div>}
      {!success && (
        <button
          onClick={handleFormSubmit}
          className={`bg-blue-500 text-white px-4 py-2 rounded-lg ${
            isSubmitDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isSubmitDisabled}
        >
          {loading ? <span>Please Wait</span> : <span>Submit</span>}
        </button>
      )}
    </div>
  );
};

export default FileUpload;
