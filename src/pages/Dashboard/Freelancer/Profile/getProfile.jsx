import { useEffect, useState } from "react";
import axios from "axios";
import { IoPersonSharp, IoLocation } from "react-icons/io5";
import { AiFillPhone, AiOutlineMail } from "react-icons/ai";
import { BiMoney } from "react-icons/bi";

const Profile = () => {
  const [userData, setUserData] = useState(null);

  const userObjectString = localStorage.getItem("user");

  const userObject = JSON.parse(userObjectString);

  const userId = userObject._id;
  const token = userObject.token;

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `https://assist-api-5y59.onrender.com/api/v1/user/${userId}`,
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

  const calculateMemberDuration = () => {
    if (userData && userData.createdAt) {
      const createdAtDate = new Date(userData.createdAt);
      const currentDate = new Date();
      const durationInMilliseconds = currentDate - createdAtDate;

      const seconds = Math.floor(durationInMilliseconds / 1000);
      if (seconds < 60) {
        return `${seconds} seconds ago`;
      }

      const minutes = Math.floor(seconds / 60);
      if (minutes < 60) {
        return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
      }

      const hours = Math.floor(minutes / 60);
      if (hours < 24) {
        return `${hours} hour${hours > 1 ? "s" : ""} ago`;
      }

      const days = Math.floor(hours / 24);
      if (days < 7) {
        return `${days} day${days > 1 ? "s" : ""} ago`;
      }

      const weeks = Math.floor(days / 7);
      if (weeks < 4) {
        return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
      }

      const months = Math.floor(weeks / 4);
      return `${months} month${months > 1 ? "s" : ""} ago`;
    }
    return "Unknown";
  };

  useEffect(() => {
    if (userId && token) {
      fetchUserData();
    }
  }, [userId, token]);

  return (
    <div className="bg-blue-300 text-gray-800 p-4 flex flex-col md:flex-row">
      {userData ? (
        <div className="w-full basis-1/3">
          <div className="w-52 mx-auto">
            <IoPersonSharp
              size={100}
              className="h-40 w-full object-cover rounded-full"
            />
          </div>
          <div className="text-center md:text-center mt-4">
            <h2 className="flex flex-row justify-center space-x-2">
              <span className="grid place-items-center">
                <IoLocation size={20} />
              </span>
              <span>{userData.location}</span>
            </h2>
            <h2 className="flex flex-row justify-center space-x-2">
              <span className="grid place-items-center">
                <AiOutlineMail size={20} />
              </span>
              <span>{userData.email}</span>
            </h2>
            <h2 className="flex flex-row justify-center space-x-2">
              <span className="grid place-items-center">
                <AiFillPhone size={20} />
              </span>
              <span>{userData.phone}</span>
            </h2>
            <h2 className="flex flex-row justify-center space-x-2">
              <span className="grid place-items-center">
                <BiMoney size={20} />
              </span>
              <span>Ksh. {userData.currentBalance}</span>
            </h2>
            <h2>
              <h2>
                <span className="font-semibold">Joined </span>
                {calculateMemberDuration()}
              </h2>
            </h2>
          </div>
        </div>
      ) : (
        <div className="w-full text-center">
          <p>Loading user profile...</p>
        </div>
      )}

      <div className="w-full border-gray-300 p-4 basis-2/3">
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
