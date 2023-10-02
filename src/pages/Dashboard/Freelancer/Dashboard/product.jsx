import React, { useState } from "react";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    // You can implement your file upload logic here, e.g., using an API call
    if (selectedFile) {
      // Simulating an upload (for demonstration purposes)
      setTimeout(() => {
        alert("File uploaded successfully.");
      }, 1000);
    } else {
      alert("Please select a file to upload.");
    }
  };

  return (
    <div className="bg-gray-100 p-4">
      <h2 className="text-2xl font-semibold mb-4">File Upload</h2>
      <div className="mb-4">
        <input
          type="file"
          accept=".pdf, .doc, .docx"
          onChange={handleFileChange}
        />
      </div>
      {selectedFile && (
        <div className="mb-4">
          <p className="text-lg font-semibold">Selected File:</p>
          <p>{selectedFile.name}</p>
        </div>
      )}
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Upload File
      </button>
    </div>
  );
};

export default FileUpload;
