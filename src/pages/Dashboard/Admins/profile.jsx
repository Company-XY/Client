import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
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
          </div>
        ) : (
          <div>
            <h2 className="text-4xl font-semibold">Loading...</h2>
            <h2 className="text-xl font-semibold mt-4">Loading...</h2>
            <h2 className="text-lg font-normal mt-4">Rating: Loading...</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
