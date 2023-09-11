import { useEffect, useState } from "react";
import Avatar from "../../../../assets/feature-1.jpg";
import axios from "axios";

const Profile = () => {
  const [userData, setUserData] = useState(null);

  const userObjectString = localStorage.getItem("user");

  const userObject = JSON.parse(userObjectString);

  const userId = userObject._id;
  const token = userObject.token;

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `https://assist-api-okgk.onrender.com/api/v1/profile/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUserData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  useEffect(() => {
    if (userId && token) {
      fetchUserData();
    }
  }, [userId, token]);

  return (
    <div className="bg-snow-300 text-gray-800 p-4 flex flex-col md:flex-row">
      {userData ? (
        <div className="w-full">
          <div className="w-52 mx-auto">
            <img
              className="h-40 w-full object-cover rounded-full"
              src={userData.avatar}
              alt="Avatar"
            />
          </div>
          <div className="text-center md:text-center mt-4">
            <h2>{userData.location}</h2>
            <h2>Joined {userData.joinedDate}</h2>
            <h2>{userData.recommendations} Recommendations</h2>
          </div>
        </div>
      ) : (
        <div className="w-full text-center">
          <p>Loading user profile...</p>
        </div>
      )}

      <div className="w-full border-gray-300 p-4">
        {userData ? (
          <div>
            <h2 className="text-4xl font-semibold">{userData.name}</h2>
            <h2 className="text-xl font-semibold mt-4">{userData.bio}</h2>
            <h2 className="text-lg font-normal mt-4">
              Rating: {userData.rating}
            </h2>
          </div>
        ) : (
          <div>
            <h2 className="text-4xl font-semibold">Loading...</h2>
            <h2 className="text-xl font-semibold mt-4">Loading...</h2>
            <h2 className="text-lg font-normal mt-4">Rating: Loading...</h2>
          </div>
        )}

        <div className="grid grid-cols-2 mt-8">
          <div>
            <h2 className="font-semibold">Open Projects</h2>
            <p>{userData ? userData.openProjects : "Loading..."}</p>
          </div>
          <div>
            <h2 className="font-semibold">Active Projects</h2>
            <p>{userData ? userData.activeProjects : "Loading..."}</p>
          </div>
          <div>
            <h2 className="font-semibold">Past Projects</h2>
            <p>{userData ? userData.pastProjects : "Loading..."}</p>
          </div>
          <div>
            <h2 className="font-semibold">Total Projects</h2>
            <p>{userData ? userData.totalProjects : "Loading..."}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
