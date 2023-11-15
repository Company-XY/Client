import { useState, useEffect } from "react";
import axios from "axios";

const MyCalls = () => {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const userObjectString = localStorage.getItem("user");
  const userObject = JSON.parse(userObjectString);
  const token = userObject.token;
  const email = userObject.email;

  const handleCalls = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8080/api/v1/consultations/calls`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const allCalls = response.data;

      const filteredCalls = allCalls.filter((call) => call.email === email);

      setCalls(filteredCalls);
      setLoading(false);
      setError(null);
    } catch (error) {
      setLoading(false);
      setError("Error fetching calls");
    }
  };

  useEffect(() => {
    handleCalls();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : calls.length === 0 ? (
        <p>No calls found for the user</p>
      ) : (
        <ul>
          {calls.map((call) => (
            <li key={call._id}>
              <p>Name: {call.name}</p>
              <p>Email: {call.email}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyCalls;
