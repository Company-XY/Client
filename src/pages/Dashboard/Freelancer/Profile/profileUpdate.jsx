import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const UpdateProfile = () => {
  const [phone, setPhone] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentRate, setPaymentRate] = useState("");
  const [experience, setExperience] = useState("");
  const [tasks, setTasks] = useState("");
  const [skills, setSkills] = useState("");
  const [sampleWorkFiles, setSampleWorkFiles] = useState([]);
  const [availability, setAvailability] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [isApprovedUpdated, setIsApprovedUpdated] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
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
    };

    setLoading(true);

    try {
      const userString = localStorage.getItem("user");
      if (userString) {
        const { _id, token } = JSON.parse(userString);
        const response = await axios.patch(
          `https://assist-api-okgk.onrender.com/api/v1/profile/${_id}`,
          userData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Profile updated successfully:", response.data);
        setIsSuccess(true);
        setLoading(false);
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      setLoading(false);
    }
  };

  const updateIsApproved = async () => {
    try {
      setLoading(false);
      const userString = localStorage.getItem("user");
      if (userString) {
        const { _id, token } = JSON.parse(userString);
        const response = await axios.patch(
          `https://assist-api-okgk.onrender.com/api/v1/profile/${_id}`,
          { isApproved: true },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("isApproved status updated successfully:", response);
        setIsSuccess(true);
        setLoading(false);
        handleReload();
      } else {
        console.error("User data not found in localStorage");
      }
    } catch (error) {
      console.error("Failed to update isApproved status:", error);
    }
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="mx-auto max-w-3xl p-4 mt-14">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Update Your Profile
      </h2>
      <p className="text-center leading-8">
        To proceed to the dashboard and bid on projects, you need to create a
        profile
      </p>
      <div className="bg-white pt-4 rounded shadow">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <label htmlFor="phone" className="block py-2">
            <span className="font-semibold">Phone:</span>
            <p className="font-normal">Enter your phone number</p>
            <input
              type="text"
              id="phone"
              name="phone"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded-md"
            />
          </label>
          <label htmlFor="avatar" className="block py-2">
            <span className="font-semibold">Avatar:</span>
            <p className="font-normal">
              Upload a quality picture to be used as your profile picture
            </p>
            <input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/*"
              onChange={(e) => setAvatarFile(e.target.files[0])}
              className="block w-full p-2 border border-gray-300 rounded-md"
            />
          </label>
          <label htmlFor="location" className="block py-2">
            <span className="font-semibold">Location:</span>
            <p className="font-normal">Where are you located?</p>
            <input
              type="text"
              id="location"
              name="location"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded-md"
            />
          </label>
          <label htmlFor="bio" className="block py-2">
            <span className="font-semibold">Bio:</span>
            <p className="font-normal">
              A brief but detailed description of your services, skills and
              abilities
            </p>
            <textarea
              id="bio"
              name="bio"
              requried
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded-md"
            ></textarea>
          </label>
          <label htmlFor="paymentMethod" className="block py-2">
            <span className="font-semibold">Payment Method:</span>
            <p className="font-normal">
              What is your preferred payment option?
            </p>
            <select
              id="paymentMethod"
              name="paymentMethod"
              required
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded-md"
            >
              <option>M-Pesa</option>
              <option>PayPal</option>
              <option>Stripe</option>
            </select>
          </label>
          <label htmlFor="paymentRate" className="block py-2">
            <span className="font-semibold">Payment Rate:</span>
            <p className="font-normal">
              What is your hourly rate in USD per hour?
            </p>
            <input
              type="number"
              id="paymentRate"
              name="paymentRate"
              required
              value={paymentRate}
              onChange={(e) => setPaymentRate(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded-md"
            />
          </label>
          <label htmlFor="experience" className="block py-2">
            <span className="font-semibold">Experience:</span>
            <p className="font-normal">What is your level of experience?</p>
            <select
              id="experience"
              name="experience"
              required
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded-md"
            >
              <option>Less than 1 year</option>
              <option>1 - 2 years</option>
              <option>3 - 4 years</option>
              <option>More than 5 years</option>
            </select>
          </label>
          <label htmlFor="tasks" className="block py-2">
            <span className="font-semibold">Tasks:</span>
            <p className="font-normal">Which are your preferred tasks?</p>
            <select
              id="tasks"
              name="tasks"
              required
              value={tasks}
              onChange={(e) => setTasks(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded-md"
            >
              <option>Select a task</option>
              <option>Content Creation</option>
              <option>Crisis Communication</option>
              <option>Email Campaigns</option>
              <option>Event Planning and Promotion</option>
            </select>
          </label>
          <label htmlFor="skills" className="block py-2">
            <span className="font-semibold">Skills:</span>
            <p className="font-normal">
              What skills do you possess as a virtual assistant?
            </p>
            <select
              id="skills"
              name="skills"
              required
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded-md"
            >
              <option>Skill 1</option>
              <option>Skill 2</option>
              <option>Skill 3</option>
              <option>Skill 4</option>
              <option>Skill 5</option>
              <option>Skill 6</option>
              <option>Skill 7</option>
              <option>Skill 8</option>
              <option>Skill 9</option>
              <option>Skill 10</option>
            </select>
          </label>
          <label htmlFor="availability" className="block py-2">
            <span className="font-semibold">Availability:</span>
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
              className="block w-full p-2 border border-gray-300 rounded-md"
            >
              <option>10 hours</option>
              <option>20 hours</option>
              <option>30 hours</option>
              <option>40 hours</option>
              <option>more than 40 hours</option>
            </select>
          </label>
          <label htmlFor="contactInfo" className="block py-2">
            <span className="font-semibold">Contact Info:</span>
            <p className="font-normal">
              Enter your physical address or any other information
            </p>
            <input
              type="text"
              id="contactInfo"
              name="contactInfo"
              required
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded-md"
            />
          </label>
          <label htmlFor="sampleWork" className="block py-2">
            <span className="font-semibold">Sample Work:</span>
            <p className="font-normal">
              Upload up to 5 samples of your previous work
            </p>
            <input
              type="file"
              id="sampleWork"
              name="sampleWork"
              multiple
              onChange={(e) => setSampleWorkFiles([...e.target.files])}
              className="block w-full p-2 border border-gray-300 rounded-md"
            />
          </label>
          {isSuccess && (
            <div className="text-green-500 my-1 py-2 bg-gray-200 px-4 rounded-lg text-center">
              <p>Update successful</p>
            </div>
          )}
          <div className="flex justify-between px-2">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 my-2 rounded-md hover-bg-blue-600"
            >
              {loading ? (
                <span>Please Wait...</span>
              ) : (
                <span> Update Profile</span>
              )}
            </button>
            {isSuccess && (
              <button
                onClick={updateIsApproved}
                className="bg-green-500 text-white py-2 px-4 my-2 rounded-md hover-bg-blue-600"
              >
                Proceed
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
