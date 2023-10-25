import { useState } from "react";
import axios from "axios";

const CreateProfile = () => {
  const [phone, setPhone] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const userString = localStorage.getItem("user");
    setLoading(true);
    setError(null);
    if (userString) {
      const { _id, token } = JSON.parse(userString);

      const formData = new FormData();
      formData.append("phone", phone);
      formData.append("location", location);
      formData.append("bio", bio);
      formData.append("contactInfo", contactInfo);
      formData.append("paymentMethod", paymentMethod);

      axios
        .patch(
          `https://assist-api-okgk.onrender.com/api/v1/profile/${_id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          setIsSuccess(true);
          setLoading(false);
          handleAvatarSubmit();
        })
        .catch((error) => {
          setLoading(false);
          if (error.response) {
            setError(error.response.data.message);
          } else {
            setError(error.message);
          }
        });
    }
  };

  const handleAvatarSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }

    const formData = new FormData();
    formData.append("avatar", avatarFile);

    setLoading(true);
    setError(null);

    try {
      const userString = localStorage.getItem("user");
      if (userString) {
        const { _id, token } = JSON.parse(userString);
        const response = await axios.patch(
          `https://assist-api-okgk.onrender.com/api/v1/profile/avatar/${_id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json", 
            },
          }
        );
        setIsSuccess(true);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError(error.message);
      }
    }
  };

  const updateIsApproved = async () => {
    try {
      setIsLoading(true);
      const userString = localStorage.getItem("user");
      if (userString) {
        const { _id, token } = JSON.parse(userString);
        const response = await axios.patch(
          `https://assist-api-okgk.onrender.com/api/v1/profile/approval/${_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("isApproved status updated successfully:", response);
        setIsSuccess(true);
        setIsLoading(false);
        handleReload();
      } else {
        console.error("User data not found in localStorage");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Failed to update isApproved status:", error);
      setIsLoading(false);
    }
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="mx-auto max-w-3xl p-4 mt-14">
      <div className="w-full max-w-screen-md p-4 px-5 sm:px-0">
        <h2 className="text-2xl font-semibold mb-2 text-center">
          Create Your Client Profile
        </h2>
        <p className="text-center leading-8">
          To proceed to the dashboard and post projects, you need to create a
          profile
        </p>
        <div className="bg-white pt-4 rounded shadow-md">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                <option>M-Pesa</option>
                <option>PayPal</option>
                <option>Stripe</option>
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
              <div className="text-green-500 my-1 py-2 bg-gray-200 px-4 rounded-lg text-center">
                <p>Update successful</p>
              </div>
            )}
            {error && (
              <div className="text-red-500 my-1 py-2 bg-gray-200 px-4 rounded-lg text-center">
                <p>{error}</p>
              </div>
            )}
            <div className="flex justify-evenly px-2">
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
                  {isLoading ? "Please Wait" : "Proceed"}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProfile;
