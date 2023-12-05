import { useState, useEffect } from "react";
import axios from "axios";
import { AiFillPlusCircle } from "react-icons/ai";

const portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const userObjectString = localStorage.getItem("user");
  const userObject = JSON.parse(userObjectString);
  const userId = userObject._id;
  const token = userObject.token;

  const fetchUserProjects = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://assist-api-5y59.onrender.com/api/v1/user/completed/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProjects(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("An error occured");
    }
  };

  useEffect(() => {
    fetchUserProjects();
  }, [userId]);

  return (
    <>
      <main className="rounded-md">
        <h2 className="flex justify-between px-4 py-1">
          <span className="font-semibold text-center text-2xl">
            Portfolio Items ()
          </span>
          <span>
            <button className="font-semibold p-1 bg-blue-500 rounded-md text-white">
              Manage
            </button>
          </span>
        </h2>
        <hr className="border-t-4 border-blue-700" />
      </main>
    </>
  );
};

export default portfolio;
