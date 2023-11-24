import { useEffect, useState } from "react";
import axios from "axios";
import { IoLocation } from "react-icons/io5";
import { AiFillPhone, AiOutlineMail } from "react-icons/ai";
import { BiMoney } from "react-icons/bi";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const userObjectString = localStorage.getItem("user");
  const userObject = JSON.parse(userObjectString);
  const userId = userObject._id;
  const token = userObject.token;
  const profileCompletion = 60;

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

  useEffect(() => {
    if (userId && token) {
      fetchUserData();
    }
  }, [userId, token]);

  return (
    <div className="flex flex-col w-full">
      {userData ? (
        <div id="Client_Profile_Card" className="rounded-lg">
          <section className="p-4 mb-1">
            <h2 className="text-2xl font-semibold px-9">
              <span>{getGreeting()} </span>
              <span>{userData.name}</span>
            </h2>
          </section>
          <section className="flex">
            <div className="hidden basis-1/4 md:flex flex-col px-4">
              <div className="w-3/4 h-2/3 grid place-items-center mx-auto my-1 py-2">
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
                  <span>{userData.location}</span>
                </div>
              </div>
              <div className="text-center mt-1">
                <span className="">Joined </span>
                {calculateMemberDuration()}
              </div>
            </div>
            <div className="basis-3/4">
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
              <div className="">Rating: {userData.rating}</div>
              <div className="cursor-pointer underline">Complete Profile</div>
            </div>
          </section>
        </div>
      ) : (
        <div className="animate-spin rounded-full h-16 w-16 text-center grid place-items-center border-t-2 border-b-2 border-blue-500"></div>
      )}
    </div>
  );
};

export default Profile;
