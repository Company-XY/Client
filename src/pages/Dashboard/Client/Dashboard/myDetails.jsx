import { useState, useEffect } from "react";
import axios from "axios";

const MyDetails = () => {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const userObjectString = localStorage.getItem("user");
  const userObject = JSON.parse(userObjectString);
  const token = userObject.token;
  const email = userObject.email;

  const handleDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8080/api/v1/consultations/details`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const allDetails = response.data;

      const filteredDetails = allDetails.filter(
        (detail) => detail.email === email
      );

      setDetails(filteredDetails);
      setLoading(false);
      setError(null);
    } catch (error) {
      setLoading(false);
      setError("Error fetching details");
    }
  };

  useEffect(() => {
    handleDetails();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : details.length === 0 ? (
        <p>No details found for the user</p>
      ) : (
        <ul>
          {details.map((detail) => (
            <li key={detail._id}>
              <p>Name: {detail.name}</p>
              <p>Email: {detail.email}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyDetails;
