import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const FileUpload = () => {
  const { jobId } = useParams();

  const [review, setReview] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    const files = e.target.files;
    setSelectedFiles([...selectedFiles, ...files]);
  };

  const handleSubmit = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user.token;
    const userEmail = user.user_email;

    try {
      const formData = new FormData();
      formData.append("email", userEmail);
      formData.append("review", review);
      for (const file of selectedFiles) {
        formData.append("files", file);
      }

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
      console.log("Product details submitted successfully.", response.data);
    } catch (error) {
      console.error(
        "Error submitting product details. Please try again.",
        error
      );
    }
  };

  // Determine if the "Submit" button should be disabled
  const isSubmitDisabled = !review || selectedFiles.length === 0;

  return (
    <div className="bg-blue-100 p-4 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Submit Project
      </h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="border-2 rounded-md border-blue-700 w-full py-2 px-4"
        />
      </div>
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
      <button
        onClick={handleSubmit}
        className={`bg-blue-500 text-white px-4 py-2 rounded-lg ${
          isSubmitDisabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isSubmitDisabled}
      >
        Submit
      </button>
    </div>
  );
};

export default FileUpload;
