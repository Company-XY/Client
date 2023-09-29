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
    <div className="grid place-items-center max-w-4xl mx-auto mt-24 my-5">
      <h2 className="text-3xl font-semibold mb-4 mx-auto text-center">
        Fill In Details To Get Guidance
      </h2>
      <span
        className="underline font-semibold cursor-pointer py-2 my-2"
        onClick={handleGoBack}
      >
        Go Back
      </span>
      <form
        onSubmit={handleSubmit}
        className="py-4 px-4 w-full bg-white rounded-lg my-2 shadow-md"
      >
        <div className="mb-4">
          <label htmlFor="email" className="py-2 font-semibold">
            Enter your Business name
          </label>{" "}
          <input
            type="text"
            id="businessName"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="w-full border rounded-md py-2 px-3"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="py-2 font-semibold">
            Provide a brief description of your PR Goals and how you want them
            executed
          </label>{" "}
          <textarea
            id="description"
            value={prGoals}
            onChange={(e) => setPrGoals(e.target.value)}
            className="w-full border rounded-md py-2 px-3"
            rows="4"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="budget" className="py-2 font-semibold">
            What is your budget:
          </label>{" "}
          <select
            onChange={(e) => setBudget(e.target.value)}
            value={budget}
            className="w-full border rounded-md py-2 px-3"
          >
            <option>Below 5000</option>
            <option>5000 - 15000</option>
            <option>15000 - 35000</option>
            <option>35000 - 55000</option>
            <option>Over 55000</option>
          </select>
        </div>
        {success && (
          <p className="text-green-500 py-2 my-1 bg-gray-200 px-4 rounded-lg text-center">
            Guidance Requested Successfully
          </p>
        )}
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-800"
        >
          {loading ? <span>Wait...</span> : <span>Submit</span>}
        </button>
      </form>
    </div>
  );
};

export default Call;
