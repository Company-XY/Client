import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Call = () => {
  const [phone, setPhone] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [prGoals, setPrGoals] = useState("");
  const [budget, setBudget] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [time2, setTime2] = useState("");
  const [date2, setDate2] = useState("");
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
      phone,
      businessName,
      prGoals,
      budget,
      time,
      date,
      time2,
      date2,
    };

    try {
      const response = await axios.post(
        "https://assist-api-okgk.onrender.com/api/v1/calls",
        callData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Call request successful", response.data);
    } catch (error) {
      console.error("Call request failed", error);
    }
  };

  return (
    <div className="p-4 mt-14">
      <h2 className="text-2xl font-semibold mb-4">Schedule a Call</h2>
      <span
        className="underline font-semibold cursor-pointer py-2 my-2"
        onClick={handleGoBack}
      >
        Go Back to Dashboard
      </span>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email">Business name</label>
          <input
            type="text"
            id="name"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="w-full bg-purple-200 rounded-lg p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="name">Phone Number</label>
          <input
            type="phone"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-purple-200 rounded-lg p-2"
            required
          />
        </div>
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
          <label htmlFor="businessName">Date 1</label>
          <input
            type="date"
            id="businessName"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-purple-200 rounded-lg p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="budget">Time 1:</label>
          <select
            onChange={(e) => setTime(e.target.value)}
            value={time}
            className="border-2 border-purple-800 rounded-lg h-10 py-2 px-4"
          >
            <option>Below 5000</option>
            <option>5000 - 15000</option>
            <option>15000 - 35000</option>
            <option>35000 - 55000</option>
            <option>Over 55000</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="businessName">Date2</label>
          <input
            type="date"
            id="businessName"
            value={date2}
            onChange={(e) => setDate2(e.target.value)}
            className="w-full bg-purple-200 rounded-lg p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="budget">Time2:</label>
          <select
            onChange={(e) => setTime2(e.target.value)}
            value={time2}
            className="border-2 border-purple-800 rounded-lg h-10 py-2 px-4"
          >
            <option>Below 5000</option>
            <option>5000 - 15000</option>
            <option>15000 - 35000</option>
            <option>35000 - 55000</option>
            <option>Over 55000</option>
          </select>
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
          Submit
        </button>
      </form>
    </div>
  );
};

export default Call;
