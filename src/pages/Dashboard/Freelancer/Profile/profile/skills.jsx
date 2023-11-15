import { AiFillPlusCircle } from "react-icons/ai";
import { useState, useEffect } from "react";
import axios from "axios";

const Skills = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const userObjectString = localStorage.getItem("user");
  const userObject = JSON.parse(userObjectString);
  const userId = userObject._id;
  const token = userObject.token;

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUserData(response.data);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  return (
    <>
      <main className="bg-blue-100 rounded-md p-2 mr-4">
        <h2 className="font-semibold">Skills</h2>
        <hr className="border-t-2 border-blue-700" />
        {userData && (
          <section className="w-full h-52 flex flex-col justify-between">
            <div className="text-center pt-4">
              {userData.skills.length === 0 ? (
                <p>You have not added any skills at the moment!</p>
              ) : (
                <div>
                  <p>Your Skills:</p>
                  <ul>
                    {userData.skills.map((skill) => (
                      <li key={skill._id}>{skill.label}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="grid place-items-center">
              <button className="px-4 py-2 flex justify-center space-x-2 bg-blue-200 rounded-md hover:bg-blue-700 font-semibold hover:text-white">
                <span className="grid place-items-center">Add Skills</span>
                <span className="grid place-items-center">
                  <AiFillPlusCircle size={20} />
                </span>
              </button>
            </div>
          </section>
        )}
      </main>
    </>
  );
};

export default Skills;
