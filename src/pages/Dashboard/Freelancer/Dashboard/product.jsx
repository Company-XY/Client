import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const FileUpload = () => {
  const { jobId } = useParams();

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e) => {
    const files = e.target.files;
    setSelectedFiles([...selectedFiles, ...files]);
  };

  const handleSubmit = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user.token;
    const userEmail = user.user_email;
    setReview("file submitted by freelancer");

    try {
      const formData = new FormData();
      formData.append("email", userEmail);
      formData.append("review", review);
      for (const file of selectedFiles) {
        formData.append("files", file);
      }
      setLoading(true);
      const response = await axios.post(
        `https://assist-api-okgk.onrender.com/api/v1/create-product/${jobId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(formData);
      setMessage("File Submitted Successfully");
      setLoading(false);
      setSuccess(true);
      console.log("Product details submitted successfully.", response.data);
    } catch (error) {
      console.error(
        "Error submitting product details. Please try again.",
        error
      );
      setLoading(false);
      setMessage("Error Submitting File");
      setSuccess(false);
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
      <button
        onClick={handleSubmit}
        className={`bg-blue-500 text-white px-4 py-2 rounded-lg ${
          isSubmitDisabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isSubmitDisabled}
      >
        {loading ? <span>Please Wait</span> : <span>Submit</span>}
      </button>
    </div>
  );
};

export default FileUpload;
