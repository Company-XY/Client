import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

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
    formData.append("avatar", avatarFile);
    formData.append("location", location);
    formData.append("bio", bio);
    formData.append("paymentMethod", paymentMethod);
    formData.append("paymentRate", paymentRate);
    formData.append("experience", experience);
    formData.append("tasks", tasks);
    formData.append("skills", skills);

    sampleWorkFiles.forEach((file, index) => {
      formData.append(`sampleWork[${index}]`, file);
    });

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

  return (
    <div className="mx-auto max-w-2xl p-4">
      <h2 className="text-2xl font-semibold mb-4">Update Your Profile</h2>
      <div className="bg-white p-4 rounded shadow">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <label htmlFor="phone" className="block">
            Phone:
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
            Avatar:
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
            Location:
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
            Bio:
            <textarea
              id="bio"
              name="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded-md"
            ></textarea>
          </label>
          <label htmlFor="paymentMethod" className="block">
            Payment Method:
            <input
              type="text"
              id="paymentMethod"
              name="paymentMethod"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded-md"
            />
          </label>
          <label htmlFor="paymentRate" className="block">
            Payment Rate:
            <input
              type="text"
              id="paymentRate"
              name="paymentRate"
              value={paymentRate}
              onChange={(e) => setPaymentRate(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded-md"
            />
          </label>
          <label htmlFor="experience" className="block">
            Experience:
            <input
              type="text"
              id="experience"
              name="experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded-md"
            />
          </label>
          <label htmlFor="tasks" className="block">
            Tasks:
            <input
              type="text"
              id="tasks"
              name="tasks"
              value={tasks}
              onChange={(e) => setTasks(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded-md"
            />
          </label>
          <label htmlFor="skills" className="block">
            Skills:
            <input
              type="text"
              id="skills"
              name="skills"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded-md"
            />
          </label>
          <label htmlFor="sampleWork" className="block">
            Sample Work:
            <input
              type="file"
              id="sampleWork"
              name="sampleWork"
              multiple
              onChange={(e) => setSampleWorkFiles([...e.target.files])}
              className="block w-full p-2 border border-gray-300 rounded-md"
            />
          </label>
          <label htmlFor="availability" className="block">
            Availability:
            <input
              type="text"
              id="availability"
              name="availability"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded-md"
            />
          </label>
          <label htmlFor="contactInfo" className="block">
            Contact Info:
            <input
              type="text"
              id="contactInfo"
              name="contactInfo"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded-md"
            />
          </label>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
        <p>
          {isSuccess ? (
            <span>
              Update successful, go to{" "}
              <span className="cursor-pointer underline">
                <Link to="/dashboard" onClick={handleApproval}>
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
