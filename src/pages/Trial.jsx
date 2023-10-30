import { useState } from "react";
import axios from "axios";

const Trial = () => {
  const [file, setFile] = useState(null);
  const [uploadResponse, setUploadResponse] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "http://localhost:8080/api/v1/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUploadResponse(response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadResponse({ error: "File upload failed" });
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <section className="bg-white rounded-lg p-8 shadow-md">
        <h1 className="text-2xl font-semibold mb-4">
          File Upload to BackBlaze
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="file"
              className="block text-sm font-medium text-gray-700"
            >
              Select a File
            </label>
            <input
              type="file"
              id="file"
              onChange={handleFileChange}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Upload File
          </button>
        </form>
        {uploadResponse && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold">Upload Response:</h2>
            <pre className="mt-2 bg-gray-200 p-4 rounded">
              {JSON.stringify(uploadResponse, null, 2)}
            </pre>
          </div>
        )}
      </section>
    </div>
  );
};

export default Trial;
