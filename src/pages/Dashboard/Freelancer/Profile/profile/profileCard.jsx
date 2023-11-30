import { useEffect, useState } from "react";
import axios from "axios";
import { IoLocation } from "react-icons/io5";
import { AiFillPhone, AiOutlineMail } from "react-icons/ai";
import { BiMoney } from "react-icons/bi";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [projects, setProjects] = useState({});
  const [error, setError] = useState("");
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

  const getGreeting = () => {
    const currentTime = new Date().getHours();
    let greeting = "";

    if (currentTime >= 5 && currentTime < 12) {
      greeting = "Good morning!";
    } else if (currentTime >= 12 && currentTime < 18) {
      greeting = "Good afternoon!";
    } else {
      greeting = "Good evening!";
    }

    return greeting;
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
      starElements.push(<FaStar key={i} size={18} className="text-gray-300" />);
    }

    return <div className="flex space-x-1">{starElements}</div>;
  };

  useEffect(() => {
    if (userId && token) {
      fetchUserData();
      fetchUserProjects();
    }
  }, [userId, token]);

  return (
    <div className="flex flex-col w-full mb-4">
      {userData ? (
        <div id="Client_Profile_Card" className="rounded-lg">
          <section className="px-4 py-2 mb-1">
            <h2 className="text-2xl font-semibold px-9">
              <span>{getGreeting()} </span>
              <span>{userData.name}</span>
            </h2>
          </section>
          <section className="flex">
            <div className="hidden basis-1/4 md:flex flex-col px-4 my-auto">
              <div className="w-3/4 h-2/3 grid place-items-center mx-auto py-2">
                <img
                  className="w-32 h-32 rounded-full"
                  src={userData.avatar.imageUrl}
                  alt="Profile"
                />
              </div>
              <div className="grid place-items-center mt-1">
                <div className="flex space-x-2">
                  <span className="">
                    <IoLocation size={20} />
                  </span>
                  <span>{userData.location}, KE</span>
                </div>
              </div>
              <div className="text-center mt-1">
                <span className="">Joined </span>
                {calculateMemberDuration()}
              </div>
            </div>
            <div className="basis-3/4 my-auto">
              <div className="flex space-x-5 my-1">
                <div className="flex space-x-3">
                  <span className="">
                    <AiOutlineMail size={20} />
                  </span>
                  <span className="font-semibold">{userData.email}</span>
                </div>
                <div className="flex space-x-3">
                  <span className="">
                    <AiFillPhone size={20} />
                  </span>
                  <span className="font-semibold">{userData.phone}</span>
                </div>
              </div>
              <div className="flex space-x-5 my-1">
                <div className="flex space-x-3">
                  <span className="">
                    <BiMoney size={20} />
                  </span>
                  <span className="font-semibold">
                    Ksh. {userData.currentBalance}
                  </span>
                </div>
                <div className="flex">
                  <span className="">Escrow Balance: </span>
                  <span className="font-semibold">
                    Ksh. {userData.escrowBalance}
                  </span>
                </div>
              </div>
              <div className="my-3 p-1">{userData.bio}</div>
              <div className="flex space-x-1">
                <span>Projects Completed : </span>
                <span className="font-semibold grid place-items-center underline cursor-pointer text-yellow-700">
                  {projects.length}
                </span>
              </div>
              <div className="flex space-x-1">
                <span>Rating</span>
                <span className="font-semibold grid place-items-center text-yellow-700">
                  {userData.rating}
                </span>
                <RatingStars rating={userData.rating} />
              </div>
            </div>
            {error}
          </section>
        </div>
      ) : (
        <div
          id="Client_Profile_Card"
          className="rounded-lg border border-gray-300 p-4 w-full animate-pulse"
        >
          <section className="mb-1">
            <h2 className="text-2xl font-semibold px-9">
              <span className="bg-gray-300 rounded h-6 w-20 inline-block mb-2"></span>
              <span className="bg-gray-300 rounded h-6 w-40 inline-block mb-2 ml-2"></span>
            </h2>
          </section>
          <section className="flex">
            <div className="hidden md:flex flex-col px-4 my-auto w-1/4">
              <div className="w-3/4 h-2/3 grid place-items-center mx-auto py-2">
                <span className="bg-gray-300 rounded-full h-32 w-32 inline-block mb-2"></span>
              </div>
              <div className="grid place-items-center mt-1">
                <div className="flex space-x-2">
                  <span className="bg-gray-300 rounded h-4 w-12 inline-block"></span>
                  <span className="bg-gray-300 rounded h-4 w-20 inline-block"></span>
                </div>
              </div>
              <div className="text-center mt-1">
                <span className="bg-gray-300 rounded h-4 w-24 inline-block"></span>
              </div>
            </div>
            <div className="my-auto w-3/4">
              <div className="flex space-x-5 my-1">
                <div className="flex space-x-3">
                  <span className="bg-gray-300 rounded h-6 w-12 inline-block"></span>
                  <span className="bg-gray-300 rounded h-6 w-40 inline-block"></span>
                </div>
                <div className="flex space-x-3">
                  <span className="bg-gray-300 rounded h-6 w-12 inline-block"></span>
                  <span className="bg-gray-300 rounded h-6 w-24 inline-block"></span>
                </div>
              </div>
              <div className="flex space-x-5 my-1">
                <div className="flex space-x-3">
                  <span className="bg-gray-300 rounded h-6 w-12 inline-block"></span>
                  <span className="bg-gray-300 rounded h-6 w-40 inline-block"></span>
                </div>
                <div className="flex">
                  <span className="bg-gray-300 rounded h-6 w-32 inline-block"></span>
                  <span className="bg-gray-300 rounded h-6 w-32 inline-block"></span>
                </div>
              </div>
              <div className="my-3 p-1">
                <span className="bg-gray-300 rounded h-16 w-full inline-block"></span>
              </div>
              <div className="flex space-x-1">
                <span className="bg-gray-300 rounded h-6 w-16 inline-block"></span>
                <span className="bg-gray-300 rounded h-6 w-16 inline-block"></span>
                <RatingStars />
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default Profile;
