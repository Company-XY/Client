import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UpdateProfile = () => {
  const [formData, setFormData] = useState({
    phone: "",
    avatar: null,
    location: "",
    bio: "",
    paymentMethod: "",
    contactInfo: "",
  });

  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userString = localStorage.getItem("user");
    if (userString) {
      const { _id, token } = JSON.parse(userString);

      try {
        const formData = new FormData();

        for (const key in formData) {
          formData.append(key, formData[key]);
        }

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
      } catch (error) {
        console.error("Failed to update profile:", error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-[80vh]">
      <div className="w-full max-w-screen-md p-4">
        <h2 className="text-2xl font-semibold mb-4">Update Your Profile</h2>
        <div className="bg-white p-4 rounded shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="py-2 my-2">
              <label htmlFor="phone" className="block font-semibold mb-2">
                Phone:
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm hover:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
              />
            </div>

            <div className="py-2 my-2">
              <label htmlFor="location" className="block font-semibold mb-2">
                Location:
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm hover:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
              />
            </div>

            <div className="py-2 my-2">
              <label htmlFor="avatar" className="block font-semibold mb-2">
                Avatar:
              </label>
              <input
                type="file"
                id="avatar"
                name="avatar"
                accept="image/*"
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm hover:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
              />
            </div>
            <div className="py-2 my-2">
              <label htmlFor="bio" className="block font-semibold mb-2">
                Bio:
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm hover:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
              ></textarea>
            </div>

            <div className="py-2 my-2">
              <label htmlFor="contactInfo" className="block font-semibold mb-2">
                Contact Info:
              </label>
              <input
                type="text"
                id="contactInfo"
                name="contactInfo"
                value={formData.contactInfo}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm hover:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
              />
            </div>

            <div className="py-2 my-2">
              <label
                htmlFor="paymentMethod"
                className="block font-semibold mb-2"
              >
                Payment Method:
              </label>
              <input
                type="text"
                id="paymentMethod"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm hover:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:ring focus:ring-blue-200 focus:outline-none"
            >
              Update Profile
            </button>
          </form>

          {isSuccess && (
            <p>
              Update successful, go to{" "}
              <span className="cursor-pointer underline">
                <Link to="/dashboard">dashboard</Link>
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
