import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Deposit = () => {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

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
      setLoading(false);
    }
  };

  const handleGoBack = (e) => {
    e.preventDefault;
    navigate("/dashboard");
  };

  return (
    <div className="grid place-items-center max-w-4xl mx-auto mt-24 my-5">
      <span
        className="py-2 hover:underline hover:font-semibold cursor-pointer"
        onClick={handleGoBack}
      >
        Go Back
      </span>
      <div className="bg-white rounded-lg w-2/3 shadow-md py-4 my-2 px-2">
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
    </div>
  );
};

export default Deposit;
