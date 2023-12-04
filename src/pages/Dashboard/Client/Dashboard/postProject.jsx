import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Select from "react-select";

const PostProject = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [services, setServices] = useState("");
  const [skills, setSkills] = useState("");
  const [budget, setBudget] = useState("");
  const [experience, setExperience] = useState("");
  const [duration, setDuration] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const userObjectString = localStorage.getItem("user");

  const userObject = JSON.parse(userObjectString);

  const token = userObject.token;
  const userEmail = userObject.email;
  const userName = userObject.name;
  const role = userObject.role;

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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = {
      role,
      title,
      user_email: userEmail,
      name: userName,
      services,
      description,
      skills,
      budget,
      duration,
    };

    try {
      const jobResponse = await axios.post(
        "https://assist-api-5y59.onrender.com/api/v1/jobs/post",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const jobId = jobResponse.data._id;
      const formDataFiles = new FormData();

      uploadedFiles.forEach((file) => {
        formDataFiles.append("files", file);
      });

      const filesResponse = await axios.patch(
        `https://assist-api-5y59.onrender.com/api/v1/jobs/${jobId}/files`,
        formDataFiles,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setIsLoading(false);
      setSuccess(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-24 my-5">
      <span
        className="font-semibold cursor-pointer my-8"
        onClick={() => navigate("/dashboard")}
      >
        <span className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-800 text-white">
          Go Back
        </span>
      </span>
      <h1 className="font-semibold text-2xl text-center text-blue-700 py-2">
        Post a Project
      </h1>
      <div className="h-fit w-full border-2 rounded-lg">
        <form onSubmit={handleFormSubmit} className="py-4 px-4 w-full">
          <div className="flex flex-col mb-4">
            <label className="font-semibold my-1">Title of the project</label>
            <input
              className="w-full border rounded-lg py-2 px-4 focus:ring focus:ring-blue-500 focus:outline-none"
              type="text"
              value={title}
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="prService" className="font-semibold my-1">
              Select the service you are looking for:
            </label>
            <select
              value={services}
              onChange={(e) => setServices(e.target.value)}
              className="w-full border rounded-lg py-2 px-4 focus:ring focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select a PR Service</option>
              <option value="Media Relations">Media Relations</option>
              <option value="Press Release Writing & Distribution">
                Press Release Writing & Distribution
              </option>
              <option value="Crisis Management">Crisis Management</option>
              <option value="Event Management">Event Management</option>
              <option value="Speaker Placement">Speaker Placement</option>
              <option value="Social Media Management">
                Social Media Management
              </option>
              <option value="Influencer Marketing">Influencer Marketing</option>
              <option value="Online Reputation Management">
                Online Reputation Management
              </option>
              <option value="Content Creation & Marketing">
                Content Creation & Marketing
              </option>
              <option value="SEO for Public Relations">
                SEO for Public Relations
              </option>
              <option value="Brand Messaging & Positioning">
                Brand Messaging & Positioning
              </option>
              <option value="Public Affairs & Government Relations">
                Public Affairs & Government Relations
              </option>
              <option value="Corporate Communications">
                Corporate Communications
              </option>
              <option value="Thought Leadership Programs">
                Thought Leadership Programs
              </option>
              <option value="Community Relations">Community Relations</option>
            </select>
          </div>

          <div className="flex flex-col mb-4">
            <label className="font-semibold my-1">
              Describe the project and what you want done
            </label>
            <textarea
              value={description}
              className="w-full border rounded-lg py-2 px-4 h-32 focus:ring focus:ring-blue-500 focus:outline-none"
              type="text"
              placeholder="Details..."
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="font-semibold my-1">
              How long should the project take (Days)
            </label>
            <input
              value={duration}
              className="w-full border rounded-lg py-2 px-4 focus:ring focus:ring-blue-500 focus:outline-none"
              type="number"
              min={1}
              placeholder="Timeline"
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="font-semibold my-1">
              What is your estimated budget for the project
            </label>
            <input
              value={budget}
              className="w-full border rounded-lg py-2 px-4 focus:ring focus:ring-blue-500 focus:outline-none"
              type="number"
              min={1}
              placeholder="Budget"
              onChange={(e) => setBudget(e.target.value)}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="skills" className="block py-2 font-semibold">
              What skills are needed to handle the project well (use the
              dropdown):
              <Select
                id="skills"
                name="skills"
                isMulti
                value={skills}
                onChange={(selectedOptions) => setSkills(selectedOptions)}
                options={[
                  { value: "Press Pitching", label: "Press Pitching" },
                  { value: "Media Networking", label: "Media Networking" },
                  { value: "Strategic Thinking", label: "Strategic Thinking" },
                  {
                    value: "Crisis Communication",
                    label: "Crisis Communication",
                  },
                  { value: "Event Coordination", label: "Event Coordination" },
                  { value: "Copywriting", label: "Copywriting" },
                  {
                    value: "Social Media Management",
                    label: "Social Media Management",
                  },
                  {
                    value: "Influencer Relations",
                    label: "Influencer Relations",
                  },
                  {
                    value: "Online Reputation Management",
                    label: "Online Reputation Management",
                  },
                  { value: "Content Creation", label: "Content Creation" },
                  { value: "SEO Optimization", label: "SEO Optimization" },
                  { value: "Brand Messaging", label: "Brand Messaging" },
                  {
                    value: "Community Engagement",
                    label: "Community Engagement",
                  },
                  { value: "Public Speaking", label: "Public Speaking" },
                  { value: "Data Analytics", label: "Data Analytics" },
                ]}
              />
            </label>
          </div>
          <div className="flex flex-col mb-4">
            <label className="font-semibold my-1">
              What level of experience is needed to handle the project?
            </label>
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full border rounded-lg py-2 px-4 focus:ring focus:ring-blue-500 focus:outline-none"
            >
              <option>Level of Experience</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Experienced">Experienced</option>
              <option value="Expert">Expert</option>
              <option value="Any">Any</option>
            </select>
          </div>
          <div className="flex flex-col mb-4">
            <label className="font-semibold my-1">
              Upload up to 5 relevant files
            </label>
            <input
              multiple
              className="w-full border rounded-lg py-2 px-3 focus:ring focus:ring-blue-500 focus:outline-none"
              type="file"
              onChange={handleFileChange}
            />
          </div>
          {renderUploadedFiles()}

          {success && (
            <div className="my-2 flex items-center justify-center space-x-2 bg-green-200 text-green-700 font-semibold px-4 py-2 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 inline-block"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Project Posted Successfully!</span>
            </div>
          )}
          {!success && (
            <button
              className="w-1/5 rounded-lg border-2 py-2 px-4 bg-blue-600 font-semibold text-white hover:bg-blue-800"
              type="submit"
            >
              {isLoading ? <span>Please Wait</span> : <span>Submit</span>}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostProject;
