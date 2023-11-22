import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Deposit = () => {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const userObjectString = localStorage.getItem("user");
  const userObject = JSON.parse(userObjectString);
  const token = userObject.token;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const userId = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))._id
        : null;

      if (!userId) {
        setLoading(false);
        setSuccess(false);
        return;
      }

      const response = await axios.post(
        `https://assist-api-5y59.onrender.com/api/v1/deposit/${userId}`,
        {
          phone,
          amount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLoading(false);
      setSuccess(true);
    } catch (error) {
      setSuccess(false);
      setLoading(false);
    }
  };

  return (
    <div className="grid place-items-center max-w-4xl mx-auto mt-24 my-5">
      <span
        className="font-semibold cursor-pointer py-2 my-6"
        onClick={() => navigate("/dashboard")}
      >
        <span className="px-4 py-2 rounded-lg bg-blue-300 hover:bg-blue-600 hover:text-white">
          Go Back
        </span>
      </span>
      <div className="bg-white rounded-lg w-full md:w-2/3 shadow-md py-4 my-2 px-4">
        <h2 className="text-2xl text-blue-600 mb-4 text-center">
          Make a Deposit (Mpesa)
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="phoneNumber"
              className="block text-gray-700 text-lg font-bold"
            >
              Phone Number
            </label>
            <p className="leading-8 py-1">Enter Your Mpesa Phone Number</p>
            <input
              type="text"
              id="phoneNumber"
              className="w-full border rounded-md py-2 px-3"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="0700000000"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="amount"
              className="block text-gray-700 text-sm font-bold"
            >
              Amount
            </label>
            <input
              type="number"
              id="amount"
              className="w-full border rounded-md py-2 px-3"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              placeholder="1000"
            />
          </div>
          {success && (
            <p className="py-2 my-1 bg-gray-200 text-green-600 rounded-lg text-center">
              Complete the deposit by entering your pin on your device, once
              complete click{" "}
              <span
                className="underline cursor-pointer"
                onClick={() => navigate("/dashboard")}
              >
                here
              </span>
            </p>
          )}
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-md mt-2"
          >
            {loading ? <span>Please Wait...</span> : <span>Deposit</span>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Deposit;
