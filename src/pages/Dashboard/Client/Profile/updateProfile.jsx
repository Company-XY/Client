import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UpdateProfile = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
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
        console.log("isApproved status updated successfully:", response.data);
        setIsSuccess(true);
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

  const handleApproval = () => {
    updateIsApproved();
    setCurrentStep(currentStep + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("phone", phone);
    formData.append("avatar", avatar);
    formData.append("location", location);
    formData.append("bio", bio);
    formData.append("paymentMethod", paymentMethod);
    formData.append("contactInfo", contactInfo);

    try {
      const userString = localStorage.getItem("user");
      if (userString) {
        const { _id, token } = JSON.parse(userString);
        console.log(_id, token);
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
        console.log(avatar);
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const steps = [
    {
      stepNumber: 1,
      content: (
        <div>
          <h2 className="text-center">Step 1/2</h2>
          <div className="py-2 my-2">
            <label htmlFor="phone" className="block font-semibold mb-2">
              Phone:
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
              value={location}
              onChange={(e) => setLocation(e.target.value)}
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
              onChange={handleFileChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm hover:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
            />{" "}
          </div>

          <button
            onClick={nextStep}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:ring focus:ring-blue-200 focus:outline-none"
          >
            Next
          </button>
        </div>
      ),
    },

    {
      stepNumber: 2,
      content: (
        <div>
          <h2 className="text-center">Step 1/2</h2>
          <div>
            <label htmlFor="bio" className="block font-semibold mb-2">
              Bio:
            </label>
            <textarea
              id="bio"
              name="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm hover:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
            ></textarea>
          </div>
          <div>
            <label htmlFor="contactInfo" className="block font-semibold mb-2">
              Contact Info:
            </label>
            <input
              type="text"
              id="contactInfo"
              name="contactInfo"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm hover:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="paymentMethod" className="block font-semibold mb-2">
              Payment Method:
            </label>
            <input
              type="text"
              id="paymentMethod"
              name="paymentMethod"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm hover:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
            />
          </div>
          <button
            onClick={prevStep}
            className="mt-4 px-4 py-2 bg-gray-300 text-gray-600 rounded-md shadow-md hover:bg-gray-400 focus:ring focus:ring-gray-200 focus:outline-none mr-4"
          >
            Previous
          </button>
          <button
            onClick={handleApproval}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:ring focus:ring-blue-200 focus:outline-none"
          >
            Complete
          </button>
        </div>
      ),
    },

    {
      stepNumber: 3,
      content: (
        <div>
          <p>
            {isSuccess ? (
              <span>
                Update successful, go to{" "}
                <span className="cursor-pointer underline">
                  <Link to="/dashboard" onClick={handleReload}>
                    {" "}
                    dashboard
                  </Link>
                </span>
              </span>
            ) : null}
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="flex items-center justify-center h-[80vh]">
      <div className="w-full max-w-screen-md p-4">
        <h2 className="text-2xl font-semibold mb-4">Update Your Profile</h2>
        <div className="bg-white p-4 rounded shadow-md">
          <form className="" onSubmit={handleSubmit}>
            <h3 className="text-xl font-semibold mb-4">
              {steps[currentStep - 1].content}
            </h3>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
