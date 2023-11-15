import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Details = () => {
  const [businessName, setBusinessName] = useState("");
  const [prGoals, setPrGoals] = useState("");
  const [budget, setBudget] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const userObjectString = localStorage.getItem("user");
  const userObject = JSON.parse(userObjectString);
  const token = userObject.token;
  const name = userObject.name;
  const email = userObject.email;
  const role = userObject.role;

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const detailsData = {
      role,
      name,
      email,
      businessName,
      prGoals,
      budget,
    };
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/consultations/details/create",
        detailsData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLoading(false);
      setSuccess(true);
    } catch (error) {
      setLoading(false);
      setSuccess(false);
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
      <h2 className="text-3xl font-semibold mb-4 mx-auto text-center">
        Fill In Details To Get Guidance
      </h2>
      <form
        onSubmit={handleSubmit}
        className="py-4 px-4 w-full bg-white rounded-lg my-2 shadow-md"
      >
        <div className="mb-4">
          <label htmlFor="businessName" className="py-2 font-semibold">
            Enter your Business name
          </label>
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
          </label>
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
          </label>
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
          <p className="text-green-500 py-2 bg-gray-200 px-4 rounded-lg text-center my-2">
            Guidance Requested Successfully
          </p>
        )}
        <div className="flex justify-between mx-2 px-4">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-800"
          >
            {loading ? <span>Wait...</span> : <span>Submit</span>}
          </button>
          {success && (
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-blue-400 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Go Back
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Details;
