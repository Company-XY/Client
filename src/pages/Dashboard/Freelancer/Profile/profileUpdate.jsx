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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("phone", phone);
    formData.append("location", location);
    formData.append("bio", bio);
    formData.append("paymentMethod", paymentMethod);
    formData.append("paymentRate", paymentRate);
    formData.append("experience", experience);
    formData.append("tasks", tasks);
    formData.append("skills", skills);

    formData.append("availability", availability);
    formData.append("contactInfo", contactInfo);

    try {
      const userString = localStorage.getItem("user");
      if (userString) {
        const { _id, token } = JSON.parse(userString);
        const response = await axios.patch(
          `https://assist-api-okgk.onrender.com/api/v1/profile/${_id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Profile updated successfully:", response.data);
        setIsSuccess(true);
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const updateIsApproved = async () => {
    try {
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
    <div className="mx-auto max-w-2xl p-4">
      <h2 className="text-2xl font-semibold mb-4">Update Your Profile</h2>
      <div className="bg-white p-4 rounded shadow">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <label htmlFor="phone" className="block">
            <span className="font-semibold">Phone:</span>
            <p className="font-normal">Enter your phone number</p>
            <input
              type="text"
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded-md"
            />
          </label>
          <label htmlFor="avatar" className="block">
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
          <label htmlFor="location" className="block">
            <span className="font-semibold">Location:</span>
            <p className="font-normal">Where are you located?</p>
            <input
              type="text"
              id="location"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded-md"
            />
          </label>
          <label htmlFor="bio" className="block">
            <span className="font-semibold">Bio:</span>
            <p className="font-normal">
              A brief but detailed description of your services, skills and
              abilities
            </p>
            <textarea
              id="bio"
              name="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded-md"
            ></textarea>
          </label>
          <label htmlFor="paymentMethod" className="block">
            <span className="font-semibold">Payment Method:</span>
            <p className="font-normal">
              What is your preferred payment option?
            </p>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="mpesa">M-Pesa</option>
              <option value="paypal">PayPal</option>
              <option value="stripe">Stripe</option>
            </select>
          </label>
          <label htmlFor="paymentRate" className="block">
            <span className="font-semibold">Payment Rate:</span>
            <p className="font-normal">
              What is your hourly rate in USD per hour?
            </p>
            <input
              type="number"
              id="paymentRate"
              name="paymentRate"
              value={paymentRate}
              onChange={(e) => setPaymentRate(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded-md"
            />
          </label>
          <label htmlFor="experience" className="block">
            <span className="font-semibold">Experience:</span>
            <p className="font-normal">What is your level of experience?</p>
            <select
              id="experience"
              name="experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="beginner">Less than 1 year</option>
              <option value="intermediate">1 - 2 years</option>
              <option value="advanced">3 - 4 years</option>
              <option value="expert">More than 5 years</option>
            </select>
          </label>
          <label htmlFor="tasks" className="block">
            <span className="font-semibold">Tasks:</span>
            <p className="font-normal">Which are your preferred tasks?</p>
            <select
              id="tasks"
              name="tasks"
              value={tasks}
              onChange={(e) => setTasks(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select a task</option>
              <option value="Content Creation">Content Creation</option>
              <option value="Crisis Communication">Crisis Communication</option>
              <option value="Email Campaigns">Email Campaigns</option>
              <option value="Event Planning and Promotion">
                Event Planning and Promotion
              </option>
              <option value="Influencer Outreach">Influencer Outreach</option>
              <option value="Market Research">Market Research</option>
              <option value="Media Relations">Media Relations</option>
              <option value="Online Reputation Management">
                Online Reputation Management
              </option>
              <option value="Press Release Writing">
                Press Release Writing
              </option>
              <option value="Social Media Management">
                Social Media Management
              </option>
              <option value="Strategic Planning">Strategic Planning</option>
              <option value="Task 12">Task 12</option>
            </select>
          </label>
          <label htmlFor="skills" className="block">
            <span className="font-semibold">Skills:</span>
            <p className="font-normal">
              What skills do you possess as a virtual assistant?
            </p>
            <select
              id="skills"
              name="skills"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="Skill 1">Skill 1</option>
              <option value="Skill 2">Skill 2</option>
              <option value="Skill 3">Skill 3</option>
              <option value="Skill 4">Skill 4</option>
              <option value="Skill 5">Skill 5</option>
              <option value="Skill 6">Skill 6</option>
              <option value="Skill 7">Skill 7</option>
              <option value="Skill 8">Skill 8</option>
              <option value="Skill 9">Skill 9</option>
              <option value="Skill 10">Skill 10</option>
            </select>
          </label>
          <label htmlFor="availability" className="block">
            <span className="font-semibold">Availability:</span>
            <p className="font-normal">
              How many hours per week are you available?
            </p>
            <select
              type="number"
              id="availability"
              name="availability"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="10 hours">10 hours</option>
              <option value="20 hours">20 hours</option>
              <option value="30 hours">30 hours</option>
              <option value="40 hours">40 hours</option>
              <option value="50 hours">more than 40 hours</option>
            </select>
          </label>
          <label htmlFor="contactInfo" className="block">
            <span className="font-semibold">Contact Info:</span>
            <p className="font-normal">
              Enter your physical address or any other information
            </p>
            <input
              type="text"
              id="contactInfo"
              name="contactInfo"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded-md"
            />
          </label>
          <label htmlFor="sampleWork" className="block">
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
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md hover-bg-blue-600"
          >
            Submit
          </button>
        </form>
        <p className="mt-4">
          {isSuccess ? (
            <span className="font-semibold">
              Update successful, go to{" "}
              <span className="cursor-pointer underline">
                <Link to="/dashboard" onClick={updateIsApproved}>
                  dashboard
                </Link>
              </span>
            </span>
          ) : null}
        </p>
      </div>
    </div>
  );
};

export default UpdateProfile;
