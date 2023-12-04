import { useEffect, useState } from "react";
import axios from "axios";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [projects, setProjects] = useState({});
  const [rating, setRating] = useState(null);
  const [count, setCount] = useState(0);

  const userObjectString = localStorage.getItem("user");
  const userObject = JSON.parse(userObjectString);
  const userId = userObject._id;
  const token = userObject.token;

  const fetchUserProjects = async () => {
    try {
      const response = await axios.get(
        `https://assist-api-5y59.onrender.com/api/v1/user/completed/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProjects(response.data);
      setCount(response.data.completedJobs.length);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const fetchUserRating = async () => {
    try {
      const response = await axios.get(
        `https://assist-api-5y59.onrender.com/api/v1/freelancer/rating/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRating(response.data);
    } catch (error) {
      setError("An error occured");
    }
  };

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
    } catch (error) {
      setError("An error occured");
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

  const RatingStars = ({ rating }) => {
    const filledStars = Math.floor(rating);
    const hasHalfStar = rating - filledStars !== 0;
    const totalStars = 5;

    const starElements = [];
    let i;

    for (i = 0; i < filledStars; i++) {
      starElements.push(<FaStar key={i} className="text-yellow-500" />);
    }

    if (hasHalfStar) {
      starElements.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
      i++;
    }

    for (; i < totalStars; i++) {
      starElements.push(<FaStar key={i} className="text-gray-300" />);
    }

    return <div className="flex space-x-1">{starElements}</div>;
  };

  useEffect(() => {
    if (userId && token) {
      fetchUserData();
      fetchUserProjects();
      fetchUserRating();
    }
  }, [userId, token]);

  return (
    <>
      <div className="border-l h-[50vh] mt-20 mx-4"></div>
      {userData ? (
        <div className="mt-20 py-4 w-full h-fit">
          <div className="w-full">
            <div>
              <img
                className="w-24 h-24 rounded-full mx-auto mb-4"
                src={userData.avatar.imageUrl}
                alt="Profile"
              />
            </div>
            <h2 className="text-xl font-bold text-center">{userData.name}</h2>
            <p className="text-gray-600 text-center mb-2">{userData.email}</p>
            <p className="text-gray-600 text-center mb-2">{userData.phone.combined}</p>
            <p className="text-gray-600 text-center mb-2">
              <span className="flex space-x-1">
                <span>{userData.location.city},</span>
                <span>{userData.location.country.code}</span>
              </span>{" "}
            </p>
            <p className="text-gray-600 text-center mb-2">
              Joined: {calculateMemberDuration()}
            </p>
            <p className="text-gray-600 text-center mb-2">
              Projects Completed:{" "}
              <span className="font-semibold cursor-pointer">{count}</span>
            </p>
            <p className="text-gray-700 text-center">
              Balance:{" "}
              <span className="font-semibold">
                Ksh.{userData.currentBalance}
              </span>
            </p>
            <p className="text-blue-700 text-center">
              Escrow Balance:{" "}
              <span className="font-semibold">
                Ksh.{userData.escrowBalance}
              </span>
            </p>
            {rating && (
              <div className="flex space-x-2 justify-center">
                <span>Rating</span>
                <span className="font-semibold grid place-items-center text-yellow-700">
                  {rating}/5
                </span>
                <RatingStars rating={rating} />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="mt-20 py-4 w-full h-fit">
          <div className="w-full">
            <div className="animate-pulse w-24 h-24 rounded-full mx-auto mb-4 bg-gray-300"></div>
            <h2 className="text-xl font-bold text-center w-40 h-6 bg-gray-300 mb-2"></h2>
            <p className="text-gray-600 text-center mb-2 w-32 h-4 bg-gray-300"></p>
            <p className="text-gray-600 text-center mb-2 w-32 h-4 bg-gray-300"></p>
            <p className="text-gray-600 text-center mb-2 w-40 h-4 bg-gray-300"></p>
            <p className="text-gray-600 text-center mb-2 w-48 h-4 bg-gray-300"></p>
            <p className="text-gray-600 text-center mb-2 w-60 h-4 bg-gray-300"></p>
            <p className="text-gray-600 text-center mb-2 w-56 h-4 bg-gray-300"></p>
            <p className="text-gray-700 text-center mb-1  w-48 h-4 bg-gray-300"></p>
            <p className="text-blue-700 text-center w-56 h-4 bg-gray-300"></p>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
