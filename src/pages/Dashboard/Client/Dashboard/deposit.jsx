import React, { useState } from "react";
import axios from "axios";

const Deposit = () => {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post(
        "https://assist-api-okgk.onrender.com/api/v1/deposit",
        {
          phone,
          amount,
        }
      );

      console.log("Deposit successful", response.data);
      setLoading(false);
      setSuccess(true);
    } catch (error) {
      console.error("Error making deposit:", error);
      setSuccess(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl text-blue-600 mb-4">Make a Deposit (Mpesa)</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="phoneNumber"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Phone Number
          </label>
          <input
            type="text"
            id="phoneNumber"
            className="w-full border rounded-md py-2 px-3"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="amount"
            className="block text-gray-700 text-sm font-bold mb-2"
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
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-md"
        >
          {loading ? <span>Please Wait...</span> : <span>Deposit</span>}
        </button>
        {success && (
          <p className="py-2">
            Complete the deposit by entering your pin on your device
          </p>
        )}
      </form>
    </div>
  );
};

export default Deposit;
