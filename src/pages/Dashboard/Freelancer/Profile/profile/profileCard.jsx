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

  return <main>Profile Card</main>;
};

export default profileCard;
