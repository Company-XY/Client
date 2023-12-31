import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Call = () => {
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [prGoals, setPrGoals] = useState("");
  const [budget, setBudget] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [time2, setTime2] = useState("");
  const [date2, setDate2] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const userObjectString = localStorage.getItem("user");
  const userObject = JSON.parse(userObjectString);
  const token = userObject.token;
  const email = userObject.email;
  const name = userObject.name;
  const role = userObject.role;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const callData = {
      role,
      name,
      email,
      service,
      phone,
      businessName,
      prGoals,
      budget,
      time,
      date,
      time2,
      date2,
    };
    setLoading(true);
    try {
      const response = await axios.post(
        "https://assist-api-5y59.onrender.com/api/v1/consultations/calls/create",
        callData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(true);
      setLoading(false);
    } catch (error) {
      setSuccess(false);
      setLoading(false);
    }
  };

  return (
    <div className="grid place-items-center max-w-4xl mx-auto mt-24 my-5">
      <span
        className="font-semibold cursor-pointer py-2 my-6"
        onClick={() => navigate("/dashboard/client/book")}
      >
        <span className="px-4 py-2 rounded-lg bg-blue-300 hover:bg-blue-600 hover:text-white">
          Go Back
        </span>
      </span>
      <h2 className="text-3xl font-semibold mb-4 mx-auto text-center">
        Schedule a Call
      </h2>
      <form
        onSubmit={handleSubmit}
        className="py-4 px-4 w-full h-fit bg-white rounded-lg my-2 shadow-md"
      >
        <div className="mb-4">
          <label
            htmlFor="businessName"
            className="py-2 font-semibold text-blue-700"
          >
            What service are you looking for?
          </label>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="w-full border rounded-lg py-2 px-4 focus:ring focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Select a PR Service</option>
            <option value="Media Relations">Media Relations</option>
            <option value="Press Release Writing & Distribution">
              Press Release Writing & Distribution
            </option>
            <option value="Crisis Management">Crisis Management</option>
            <option value="Event Management">Event Management</option>
            <option value="Speaker Placement">Speaker Placement</option>
            <option value="Social Media Management">
              Social Media Management
            </option>
            <option value="Influencer Marketing">Influencer Marketing</option>
            <option value="Online Reputation Management">
              Online Reputation Management
            </option>
            <option value="Content Creation & Marketing">
              Content Creation & Marketing
            </option>
            <option value="SEO for Public Relations">
              SEO for Public Relations
            </option>
            <option value="Brand Messaging & Positioning">
              Brand Messaging & Positioning
            </option>
            <option value="Public Affairs & Government Relations">
              Public Affairs & Government Relations
            </option>
            <option value="Corporate Communications">
              Corporate Communications
            </option>
            <option value="Thought Leadership Programs">
              Thought Leadership Programs
            </option>
            <option value="Community Relations">Community Relations</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="businessName"
            className="py-2 font-semibold  text-blue-700"
          >
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
          <label htmlFor="phone" className="py-2 font-semibold text-blue-700">
            Phone Number
          </label>
          <input
            type="phone"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border rounded-md py-2 px-3"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="prGoals"
            className="py-2 font-semibold  text-blue-700"
          >
            Provide a brief description of your PR Goals and how you want them
            executed
          </label>
          <textarea
            id="prGoals"
            value={prGoals}
            onChange={(e) => setPrGoals(e.target.value)}
            className="w-full border rounded-md py-2 px-3"
            rows="4"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="py-2 font-semibold  text-blue-700">
            When are you available for the call?
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border rounded-md py-2 px-3"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="time" className="py-2 font-semibold  text-blue-700">
            At what time?
          </label>
          <select
            onChange={(e) => setTime(e.target.value)}
            value={time}
            className="w-full border rounded-md py-2 px-3"
          >
            <option>9:00AM - 9:30AM</option>
            <option>9:30AM - 10:00AM</option>
            <option>10:00AM - 10:30AM</option>
            <option>10:30AM - 11:00AM</option>
            <option>11:30AM - 12:00PM</option>
            <option>12:00PM - 12:30PM</option>
            <option>12:30PM - 1:00PM</option>
            <option>1:30PM - 2:00PM</option>
            <option>2:30PM - 3:00PM</option>
            <option>3:30PM - 4:00PM</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="date2" className="py-2 font-semibold  text-blue-700">
            Provide an alternate date in case you are not available on the first
            date
          </label>
          <input
            type="date"
            id="date2"
            value={date2}
            onChange={(e) => setDate2(e.target.value)}
            className="w-full border rounded-md py-2 px-3"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="time2" className="py-2 font-semibold  text-blue-700">
            At what time?
          </label>
          <select
            onChange={(e) => setTime2(e.target.value)}
            value={time2}
            className="w-full border rounded-md py-2 px-3"
          >
            <option>9:00AM - 9:30AM</option>
            <option>9:30AM - 10:00AM</option>
            <option>10:00AM - 10:30AM</option>
            <option>10:30AM - 11:00AM</option>
            <option>11:30AM - 12:00PM</option>
            <option>12:00PM - 12:30PM</option>
            <option>12:30PM - 1:00PM</option>
            <option>1:30PM - 2:00PM</option>
            <option>2:30PM - 3:00PM</option>
            <option>3:30PM - 4:00PM</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="budget" className="py-2 font-semibold  text-blue-700">
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
          <p className="text-green-500 py-2 my-1 bg-gray-200 px-4 rounded-lg text-center">
            Call Requested Successfully
          </p>
        )}
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800"
          >
            {loading ? <span>Wait...</span> : <span>Submit</span>}
          </button>
          {success && (
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Go Back
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Call;
