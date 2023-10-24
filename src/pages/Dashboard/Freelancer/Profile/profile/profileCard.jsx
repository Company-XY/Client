import { useEffect, useState } from "react";
import axios from "axios";
import { IoPersonSharp, IoLocation } from "react-icons/io5";
import { AiFillPhone, AiOutlineMail } from "react-icons/ai";
import { BiMoney } from "react-icons/bi";

const ProfileCard = () => {
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
    <main className="bg-blue-100 rounded-md h-80 ml-8 p-4">
      {userData ? (
        <section className="flex">
          <div className="w-1/3 flex flex-col items-center">
            <div className="w-3/4 h-3/4 relative">
              <img
                className="w-36 h-36 rounded-full"
                src={userData.avatar.imageUrl}
                alt="Profile"
              />
            </div>

            <h2 className="text-xl font-bold mt-2">{userData.name}</h2>
          </div>
          <div className="w-2/3 p-4">
            <div className="mb-4">
              <div className="flex items-center">
                <AiOutlineMail className="mr-2" />
                <p className="text-gray-600">{userData.email}</p>
              </div>
            </div>
            <div className="mb-4">
              <div className="flex items-center">
                <AiFillPhone className="mr-2" />
                <p className="text-gray-600">{userData.phone}</p>
              </div>
            </div>
            <div className="mb-4">
              <div className="flex items-center">
                <IoLocation className="mr-2" />
                <p className="text-gray-600">{userData.location}</p>
              </div>
            </div>
            <p className="text-gray-600">Joined: {calculateMemberDuration()}</p>
            <p className="text-gray-700">
              Balance:{" "}
              <span className="font-semibold">
                Ksh. {userData.accountBalance}
              </span>
            </p>
            <div className="mt-4">
              <span className="text-gray-500">Rating: </span>
            </div>
          </div>
        </section>
      ) : (
        <span>Loading</span>
      )}
    </main>
  );
};

export default ProfileCard;
