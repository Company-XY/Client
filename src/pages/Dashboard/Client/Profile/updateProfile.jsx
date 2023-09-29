import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UpdateProfile = () => {
  const [phone, setPhone] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const userString = localStorage.getItem("user");
    setLoading(true);
    if (userString) {
      const { _id, token } = JSON.parse(userString);

      const profileData = {
        phone,
        location,
        bio,
        paymentMethod,
        contactInfo,
      };

      axios
        .patch(
          `https://assist-api-okgk.onrender.com/api/v1/profile/${_id}`,
          profileData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log("Profile updated successfully:", response.data);
          setIsSuccess(true);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Failed to update profile:", error);
          setLoading(false);
        });
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
    <div className="flex items-center justify-center h-[80vh] mt-32">
      <div className="w-full max-w-screen-md p-4">
        <h2 className="text-2xl font-semibold mb-2 text-center">
          Update Your Profile
        </h2>
        <p className="text-center leading-8">
          To proceed to the dashboard and post projects, you need to create a
          profile
        </p>
        <div className="bg-white py-4 rounded shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="py-2 my-1">
              <label htmlFor="phone" className="block font-semibold mb-2">
                Phone:
              </label>
              <p className="font-normal">Enter your phone number</p>
              <input
                type="text"
                id="phone"
                name="phone"
                value={phone}
                required
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm hover:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
              />
            </div>
            <div className="py-2 my-1">
              <label htmlFor="avatar" className="block font-semibold mb-2">
                Avatar:
              </label>
              <p className="font-normal">
                Upload a quality picture to be used as your profile picture
              </p>
              <input
                type="file"
                id="avatar"
                name="avatar"
                accept="image/*"
                required
                onChange={(e) => setAvatarFile(e.target.files[0])}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm hover:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
              />
            </div>
            <div className="py-2 my-1">
              <label htmlFor="location" className="block font-semibold mb-2">
                Location:
              </label>
              <p className="font-normal">Where are you located?</p>
              <input
                type="text"
                id="location"
                name="location"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm hover:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
              />
            </div>
            <div className="py-2 my-1">
              <label htmlFor="bio" className="block font-semibold mb-2">
                Bio:
              </label>
              <p className="font-normal">
                A brief of who you are and the services you are looking for
              </p>
              <textarea
                id="bio"
                name="bio"
                required
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm hover:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
              ></textarea>
            </div>
            <div className="py-2 my-1">
              <label
                htmlFor="paymentMethod"
                className="block font-semibold mb-2"
              >
                Payment Method:
              </label>
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
                <option value="mpesa">M-Pesa</option>
                <option value="paypal">PayPal</option>
                <option value="stripe">Stripe</option>
              </select>
            </div>
            <div className="py-2 my-1">
              <label htmlFor="contactInfo" className="block font-semibold mb-2">
                Contact Info:
              </label>
              <input
                type="text"
                id="contactInfo"
                required
                name="contactInfo"
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm hover:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
              />
            </div>
            {isSuccess && (
              <div className="text-green-500 py-2 bg-gray-200 px-4 rounded-lg text-center">
                <p>
                  Update successful, click to proceed to{" "}
                  <span
                    className="cursor-pointer underline text-green-700"
                    onClick={updateIsApproved}
                  >
                    <Link to="/dashboard">Dashboard</Link>
                  </span>
                </p>
              </div>
            )}
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:ring focus:ring-blue-200 focus:outline-none"
            >
              {loading ? (
                <span>Please Wait...</span>
              ) : (
                <span> Update Profile</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
