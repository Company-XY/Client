import { useState } from "react";
import Select from "react-select";
import axios from "axios";

const CreateProfile = () => {
  const userObjectString = localStorage.getItem("user");
  const userObject = JSON.parse(userObjectString);
  const _id = userObject._id;
  const token = userObject.token;

  const [phone, setPhone] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [sampleWorkFiles, setSampleWorkFiles] = useState([]);
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentRate, setPaymentRate] = useState("");
  const [experience, setExperience] = useState("");
  const [tasks, setTasks] = useState("");
  const [skills, setSkills] = useState("");
  const [availability, setAvailability] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.patch(
        `https://assist-api-5y59.onrender.com/api/v1/users/update/profile/${_id}`,
        {
          phone,
          location,
          bio,
          paymentMethod,
          paymentRate,
          experience,
          tasks,
          skills,
          availability,
          contactInfo,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);
      handleAvatarSubmit();
    } catch (error) {
      setLoading(false);
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  const handleAvatarSubmit = async () => {
    const formData = new FormData();
    formData.append("avatar", avatarFile);

    setLoading(true);
    setError(null);

    try {
      const response = await axios.patch(
        `https://assist-api-5y59.onrender.com/api/v1/users/profile/avatar/${_id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setIsSuccess(true);
      setLoading(false);
      handleSampleWorkSubmit();
    } catch (error) {
      setLoading(false);
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  const handleSampleWorkSubmit = async () => {
    const formData = new FormData();
    for (const file of sampleWorkFiles) {
      formData.append("sampleWork", file);
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.patch(
        `https://assist-api-5y59.onrender.com/api/v1/users/profile/samples/${_id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setIsSuccess(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  const updateIsApproved = async () => {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `https://assist-api-5y59.onrender.com/api/v1/users/profile/approval/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsSuccess(true);
      setIsLoading(false);
      window.location.reload();
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Create Your Freelancer Profile
      </h2>
      <p className="text-center leading-8">
        To proceed to the dashboard and bid on projects, you need to create a
        profile
      </p>
      <div className="bg-white pt-4 rounded">
        <form onSubmit={handleSubmit}>
          <div className="my-2 py-2">
            <h2 className="font-semibold text-lg text-blue-700">
              Personal Details
            </h2>
            <hr />
            <label htmlFor="avatar" className="block py-2">
              <span className="font-semibold">Avatar</span>
              <p className="font-normal">
                Upload a quality picture to be used as your profile picture
              </p>
              <input
                type="file"
                id="avatar"
                name="avatar"
                accept="image/*"
                onChange={(e) => setAvatarFile(e.target.files[0])}
                className="block w-full p-2 border border-gray-300 rounded-md focus-outline"
              />
            </label>
            <label htmlFor="phone" className="block py-2">
              <span className="font-semibold">Phone</span>
              <p className="font-normal">
                Enter your phone number, Use the format 0700000000
              </p>{" "}
              <input
                type="text"
                id="phone"
                name="phone"
                required
                maxLength={10}
                minLength={10}
                placeholder="0700000000"
                onChange={(e) => setPhone(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded-md focus-outline"
              />
            </label>
            <label htmlFor="location" className="block py-2">
              <span className="font-semibold">Location</span>
              <p className="font-normal">Where are you located?</p>
              <input
                type="text"
                id="location"
                name="location"
                required
                value={location}
                placeholder="Nairobi"
                onChange={(e) => setLocation(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded-md focus-outline"
              />
            </label>
            <label htmlFor="bio" className="block py-2">
              <span className="font-semibold">Bio</span>
              <p className="font-normal">
                A brief but detailed description of your services, skills, and
                abilities
              </p>
              <textarea
                id="bio"
                name="bio"
                required
                placeholder="A dedicated freelancer..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded-md focus-outline"
              ></textarea>
            </label>
          </div>
          <div className="my-2 py-2 mt-2">
            <h2 className="font-semibold text-lg text-blue-700">
              Professional Information
            </h2>
            <hr />
            <label htmlFor="tasks" className="block py-2 font-semibold">
              What tasks are you able to handle (use the dropdown):
              <Select
                id="tasks"
                name="tasks"
                required
                placeholder="Tasks"
                isMulti
                value={tasks}
                onChange={(selectedOptions) => setTasks(selectedOptions)}
                options={[
                  { value: "Media Relations", label: "Media Relations" },
                  {
                    value: "Press Release Writing & Distribution",
                    label: "Press Release Writing & Distribution",
                  },
                  { value: "Crisis Management", label: "Crisis Management" },
                  { value: "Event Management", label: "Event Management" },
                  { value: "Speaker Placement", label: "Speaker Placement" },
                  {
                    value: "Social Media Management",
                    label: "Social Media Management",
                  },
                  {
                    value: "Influencer Marketing",
                    label: "Influencer Marketing",
                  },
                  {
                    value: "Online Reputation Management",
                    label: "Online Reputation Management",
                  },
                  {
                    value: "Content Creation & Marketing",
                    label: "Content Creation & Marketing",
                  },
                  {
                    value: "SEO for Public Relations",
                    label: "SEO for Public Relations",
                  },
                  {
                    value: "Brand Messaging & Positioning",
                    label: "Brand Messaging & Positioning",
                  },
                  {
                    value: "Public Affairs & Government Relations",
                    label: "Public Affairs & Government Relations",
                  },
                  {
                    value: "Corporate Communications",
                    label: "Corporate Communications",
                  },
                  {
                    value: "Thought Leadership Programs",
                    label: "Thought Leadership Programs",
                  },
                  {
                    value: "Community Relations",
                    label: "Community Relations",
                  },
                ]}
              />
            </label>

            <label htmlFor="skills" className="block py-2 font-semibold">
              Select your skills (use the dropdown):
              <Select
                id="skills"
                name="skills"
                isMulti
                placeholder="Skills"
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
            <label htmlFor="experience" className="block py-2">
              <span className="font-semibold">Experience</span>
              <p className="font-normal">What is your level of experience?</p>
              <select
                id="experience"
                name="experience"
                required
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded-md focus-outline"
              >
                <option>Less than 1 year</option>
                <option>1 - 2 years</option>
                <option>3 - 4 years</option>
                <option>More than 5 years</option>
              </select>
            </label>
            <label htmlFor="sampleWork" className="block py-2">
              <span className="font-semibold">Sample Work (Up to 5 files)</span>
              <p className="font-normal">
                Upload sample work files (up to 5 files)
              </p>
              <input
                type="file"
                id="sampleWork"
                name="sampleWork"
                accept=".pdf,.doc,.docx,.txt"
                multiple
                onChange={(e) => {
                  const files = e.target.files;
                  const filesArray = Array.from(files);
                  setSampleWorkFiles(filesArray);
                }}
                className="block w-full p-2 border border-gray-300 rounded-md focus-outline"
              />
            </label>
          </div>
          <div className="my-2 py-2 mt-2">
            <h2 className="font-semibold text-lg text-blue-700">
              Payment Details
            </h2>
            <label htmlFor="paymentMethod" className="block py-2">
              <span className="font-semibold">Payment Method</span>
              <p className="font-normal">
                What is your preferred payment option?
              </p>
              <select
                id="paymentMethod"
                name="paymentMethod"
                required
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded-md focus-outline"
              >
                <option value="M-pesa">M-Pesa</option>
                <option value="PayPal">PayPal</option>
                <option value="Stripe">Stripe</option>
              </select>
            </label>
            <label htmlFor="paymentRate" className="block py-2">
              <span className="font-semibold">Payment Rate</span>
              <p className="font-normal">
                What is your hourly rate in KES per hour?
              </p>
              <div className="flex space-x-5">
                <input
                  type="number"
                  id="paymentRate"
                  name="paymentRate"
                  required
                  min={100}
                  placeholder="200"
                  value={paymentRate}
                  onChange={(e) => setPaymentRate(e.target.value)}
                  className="block w-[1/3] p-2 border border-gray-300 rounded-md focus-outline"
                />
                <span className="font-semibold grid place-items-center">
                  KES per hour
                </span>
              </div>
            </label>
            <label htmlFor="availability" className="block py-2">
              <span className="font-semibold">Availability</span>
              <p className="font-normal">
                How many hours per week are you available?
              </p>
              <select
                type="number"
                id="availability"
                required
                name="availability"
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded-md focus-outline"
              >
                <option>10 hours</option>
                <option>20 hours</option>
                <option>30 hours</option>
                <option>40 hours</option>
                <option>more than 40 hours</option>
              </select>
            </label>
          </div>
          <div className="my-2 py-2 mt-2">
            <h2 className="font-semibold text-lg text-blue-700">
              Other Details
            </h2>
            <label htmlFor="contactInfo" className="block py-2">
              <span className="font-semibold">Contact Info</span>
              <p className="font-normal">
                Enter your physical address or any other information
              </p>
              <input
                type="text"
                id="contactInfo"
                name="contactInfo"
                required
                value={contactInfo}
                placeholder="ABC Place, Westlands"
                onChange={(e) => setContactInfo(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded-md focus-outline"
              />
            </label>
          </div>

          {isSuccess && (
            <div className="text-green-500 my-1 py-2 bg-gray-200 px-4 rounded-lg text-center">
              <p>Update successful</p>
            </div>
          )}
          {error && (
            <div className="text-red-500 my-1 py-2 bg-gray-200 px-4 rounded-lg text-center">
              <p>{error}</p>
            </div>
          )}

          <div className="flex justify-between px-2">
            {isSuccess ? (
              <button
                onClick={updateIsApproved}
                className="bg-green-500 text-white py-2 px-4 my-2 rounded-md hover-bg-blue-600"
              >
                Proceed
              </button>
            ) : (
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 my-2 rounded-md hover-bg-blue-600"
              >
                {loading ? (
                  <span>Please Wait...</span>
                ) : (
                  <span> Create Profile</span>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProfile;
