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
  const [error, setError] = useState(null);

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
  };

  const handleCityChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userString = localStorage.getItem("user");
    setLoading(true);
    setError(null);
    if (userString) {
      const { _id, token } = JSON.parse(userString);

      axios
        .patch(
          `https://assist-api-5y59.onrender.com/api/v1/users/update/profile/${_id}`,
          {
            phone,
            location: {
              city: location,
              country: {
                name: selectedCountry.label,
                code: selectedCountry.value,
              },
            },
            bio,
            contactInfo,
            paymentMethod,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
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
      const userString = localStorage.getItem("user");
      if (userString) {
        const { _id, token } = JSON.parse(userString);
        const response = await axios.patch(
          `https://assist-api-5y59.onrender.com/api/v1/users/profile/approval/${_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        window.location.reload();
      } else {
        setError("User data not found in localStorage");
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="mx-auto max-w-4xl md:px-4 mt-8">
      <div className="w-full max-w-screen-md px-1 md:px-5 sm:px-0">
        <h2 className="text-xl md:text-2xl font-semibold mb-2 text-center">
          Create Your Client Profile
        </h2>
        <p className="text-center leading-6 md:leading-8">
          To proceed to the dashboard and post projects, you need to create a
          profile
        </p>
        <div className="bg-white pt-4 rounded">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="py-2 my-1">
              <label
                htmlFor="phone"
                className="block font-semibold mb-1 text-blue-700"
              >
                Phone
              </label>
              <p className="font-normal">
                Enter your phone number, Use the format 0700000000
              </p>
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
            </div>
            <div className="py-2 my-1">
              <label
                htmlFor="avatar"
                className="block font-semibold mb-1 text-blue-700"
              >
                Avatar
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
              <label
                htmlFor="bio"
                className="block font-semibold mb-1 text-blue-700"
              >
                Location
              </label>{" "}
              <p className="font-normal py-1">Where are you located?</p>
              <div className="flex space-x-3">
                <Select
                  id="country"
                  name="country"
                  placeholder="Country"
                  value={selectedCountry}
                  onChange={handleCountryChange}
                  options={countryOptions}
                  className="basis-1/4 mt-1"
                />
                <input
                  type="text"
                  id="city"
                  name="city"
                  required
                  placeholder="City..."
                  onChange={handleCityChange}
                  className="basis-3/4 w-full p-2 border border-gray-300 rounded-md focus-outline"
                />
              </div>
            </div>
            <div className="py-2 my-1">
              <label
                htmlFor="bio"
                className="block font-semibold mb-1 text-blue-700"
              >
                Bio
              </label>
              <p className="font-normal">
                A brief of who you are and the services you are looking for
              </p>
              <textarea
                id="bio"
                name="bio"
                required
                placeholder="What the client is looking for and how they can be assisted"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm hover:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
              ></textarea>
            </div>
            <div className="py-2 my-1">
              <label
                htmlFor="paymentMethod"
                className="block font-semibold mb-1 text-blue-700"
              >
                Payment Method
              </label>
              <p className="font-normal py-1">
                What is your preferred payment option when topping up your
                account?
              </p>
              <select
                id="paymentMethod"
                name="paymentMethod"
                required
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Payment Method</option>
                <option value="M-pesa">M-Pesa</option>
                <option value="PayPal">PayPal</option>
                <option value="Stripe">Stripe</option>
              </select>
            </div>
            <div className="py-2 my-1">
              <label
                htmlFor="contactInfo"
                className="block font-semibold mb-2 text-blue-700"
              >
                Contact Info
              </label>
              <p className="font-normal">
                Enter your physical address or any other information
              </p>
              <input
                type="text"
                id="contactInfo"
                required
                placeholder="ABC Place, Westlands"
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
              {isSuccess ? (
                <button
                  onClick={updateIsApproved}
                  className="bg-green-500 text-white py-2 px-4 my-2 rounded-md hover-bg-blue-600"
                >
                  Proceed
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="bg-blue-500 text-white py-2 px-4 my-2 rounded-md hover-bg-blue-600"
                >
                  {loading ? "Please Wait..." : "Submit"}
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
