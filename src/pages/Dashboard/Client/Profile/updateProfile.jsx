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

  const progressBarWidth = ((currentStep - 1) / 6) * 100;

  const steps = [
    {
      stepNumber: 1,
      content: (
        <div>
          {/* Step 1 Form */}
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button onClick={nextStep} className="btn-primary">
            Next
          </button>
        </div>
      ),
    },
    {
      stepNumber: 2,
      content: (
        <div>
          {/* Step 2 Form */}
          <label htmlFor="avatar">Avatar:</label>
          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/*"
            onChange={handleFileChange}
          />
          <button onClick={prevStep} className="btn-secondary mr-4">
            Previous
          </button>
          <button onClick={nextStep} className="btn-primary">
            Next
          </button>
        </div>
      ),
    },
    {
      stepNumber: 3,
      content: (
        <div>
          {/* Step 3 Form */}
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button onClick={prevStep} className="btn-secondary mr-4">
            Previous
          </button>
          <button onClick={nextStep} className="btn-primary">
            Next
          </button>
        </div>
      ),
    },
    {
      stepNumber: 4,
      content: (
        <div>
          {/* Step 4 Form */}
          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            name="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
          <button onClick={prevStep} className="btn-secondary mr-4">
            Previous
          </button>
          <button onClick={nextStep} className="btn-primary">
            Next
          </button>
        </div>
      ),
    },
    {
      stepNumber: 5,
      content: (
        <div>
          {/* Step 5 Form */}
          <label htmlFor="paymentMethod">Payment Method:</label>
          <input
            type="text"
            id="paymentMethod"
            name="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <button onClick={prevStep} className="btn-secondary mr-4">
            Previous
          </button>
          <button onClick={nextStep} className="btn-primary">
            Next
          </button>
        </div>
      ),
    },
    {
      stepNumber: 6,
      content: (
        <div>
          {/* Step 6 Form */}
          <label htmlFor="contactInfo">Contact Info:</label>
          <input
            type="text"
            id="contactInfo"
            name="contactInfo"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
          />
          <button onClick={prevStep} className="btn-secondary mr-4">
            Previous
          </button>
          <button
            onClick={handleApproval}
            type="submit"
            className="btn-primary"
          >
            Submit
          </button>
          <p>
            {isSuccess ? (
              <span>
                Update successfull, go to{" "}
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
    <div className="mx-auto max-w-2xl p-4">
      <h2 className="text-2xl font-semibold mb-4">Update Your Profile</h2>
      <div className="bg-blue-200 h-4 rounded-full mb-4">
        <div
          className={`bg-blue-500 h-full rounded-full transition-width duration-300 ease-in-out w-${progressBarWidth}`}
        ></div>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <form onSubmit={handleSubmit}>
          <h3 className="text-xl font-semibold mb-4">
            {steps[currentStep - 1].content}
          </h3>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
