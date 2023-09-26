import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Call = () => {
  const [businessName, setBusinessName] = useState("");
  const [prGoals, setPrGoals] = useState("");
  const [budget, setBudget] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const userObjectString = localStorage.getItem("user");

  const userObject = JSON.parse(userObjectString);

  const token = userObject.token;

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/dashboard");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const callData = {
      businessName,
      prGoals,
      budget,
    };
    setLoading(true);
    try {
      const response = await axios.post(
        "https://assist-api-okgk.onrender.com/api/v1/details",
        callData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Call request successful", response.data);
      setLoading(false);
      setSuccess(true);
    } catch (error) {
      console.error("Call request failed", error);
      setLoading(false);
      setSuccess(false);
    }
  };

  return (
    <div className="p-4 mt-14">
      <h2 className="text-2xl font-semibold mb-4">
        Fill in details to get guidance
      </h2>
      <span
        className="underline font-semibold cursor-pointer py-2 my-2"
        onClick={handleGoBack}
      >
        Go Back to Dashboard
      </span>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="businessName">Business Name</label>
          <input
            type="text"
            id="businessName"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="w-full bg-purple-200 rounded-lg p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description">PR Goals</label>
          <textarea
            id="description"
            value={prGoals}
            onChange={(e) => setPrGoals(e.target.value)}
            className="w-full bg-purple-200 rounded-lg p-2"
            rows="4"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="budget">What is your budget:</label>
          <select
            onChange={(e) => setBudget(e.target.value)}
            value={budget}
            className="border-2 border-purple-800 rounded-lg h-10 py-2 px-4"
          >
            <option>Below 5000</option>
            <option>5000 - 15000</option>
            <option>15000 - 35000</option>
            <option>35000 - 55000</option>
            <option>Over 55000</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-purple-600 text-white p-2 rounded-md hover:bg-purple-800"
        >
          {loading ? <span>Wait...</span> : <span>Submit</span>}
        </button>
        <p>{success && <span>Call Requested Successfully</span>}</p>
      </form>
    </div>
  );
};

export default Call;
