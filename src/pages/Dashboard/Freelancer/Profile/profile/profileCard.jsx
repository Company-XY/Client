import { useEffect, useState } from "react";
import axios from "axios";
import { IoPersonSharp, IoLocation } from "react-icons/io5";
import { AiFillPhone, AiOutlineMail } from "react-icons/ai";
import { BiMoney } from "react-icons/bi";

const profileCard = () => {
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
    <>
      <main className="bg-blue-100 rounded-md h-80 ml-8">
        <section className="flex">
          <div className="basis-1/3">
            <div className="w-full">
              <IoPersonSharp className="w-36 h-40 rounded-full mx-auto" />
              <h2 className="text-xl font-bold text-center">Name</h2>
              <p className="text-gray-600 text-center">Email</p>
            </div>
          </div>
          <div className="basis-1/3 pt-8">
            <p className="text-gray-600 ">Phone Number</p>
            <p className="text-gray-600 ">Location</p>
            <p className="text-gray-600 ">
              Joined: {calculateMemberDuration()}
            </p>
            <p className="text-gray-700 ">
              Balance: <span className="font-semibold">Ksh.0</span>
            </p>
            <div className="">
              <span className="text-gray-500">Rating: </span>
            </div>
          </div>
          <div className="basis-1/3 pt-8">
            <p>Jobs Completed</p>
            <p>Jobs Disputed</p>
            <p>Jobs Declined</p>
            <p>Total Jobs</p>
          </div>
        </section>
      </main>
    </>
  );
};

export default profileCard;
