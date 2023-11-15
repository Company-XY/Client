import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Withdraw = () => {
  const [userData, setUserData] = useState(null);
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userString = localStorage.getItem("user");

    if (userString) {
      const user = JSON.parse(userString);
      const userId = user._id;
      const token = user.token;
      fetchUserData(userId, token);
    } else {
      navigate("/");
    }
  }, [navigate]);

  const fetchUserData = async (userId, token) => {
    try {
      const response = await axios.get(
        `https://assist-api-5y59.onrender.com/api/v1/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUserData(response.data);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (parseFloat(amount) > userData.accountBalance) {
      setError("Insufficient Balance");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "https://assist-api-5y59.onrender.com/api/v1/withdraw",
        {
          phone,
          amount,
        }
      );

      console.log("Withdrawal successful", response.data);
      setLoading(false);
      setSuccess(true);
    } catch (error) {
      console.error("Error making a withdrawal:", error);
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
      <div className="bg-white rounded-lg w-2/3 shadow-md py-4 my-2 px-2">
        <h2 className="text-2xl text-blue-600 mb-4 text-center">
          Get Paid to your Mpesa
        </h2>
        <div className="bg-blue-200 rounded-lg h-20 grid place-items-center my-2 cursor-pointer">
          <p className="font-semibold text-xl">
            Available Balance:{" "}
            {userData ? userData.currentBalance : "Loading..."}
          </p>
        </div>
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
              minLength={10}
              maxLength={10}
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
              min={1}
              placeholder="1000"
            />
          </div>
          {error && <p className="text-red-600 my-2 py-2">{error}</p>}
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-md"
          >
            {loading ? <span>Please Wait...</span> : <span>Withdraw</span>}
          </button>
          {success && <p className="py-2">Withdrawal successful</p>}
        </form>{" "}
      </div>
    </div>
  );
};

export default Withdraw;
