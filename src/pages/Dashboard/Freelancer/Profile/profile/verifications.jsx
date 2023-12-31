import { useState, useEffect } from "react";
import { IoPersonSharp, IoLocation } from "react-icons/io5";
import { AiFillPhone, AiOutlineMail } from "react-icons/ai";
import { BiMoney } from "react-icons/bi";
import { BsFillPatchCheckFill } from "react-icons/bs";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const verifications = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  const userObjectString = localStorage.getItem("user");

  const userObject = JSON.parse(userObjectString);

  const userId = userObject?._id;
  const token = userObject?.token;

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

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  return (
    <main className="bg-blue-100 rounded-md p-2">
      <h2 className="font-semibold">Verifications</h2>
      <hr className="border-t-2 border-blue-700" />
      <div className="p-1 h-40">
        <div className="py-1 flex justify-between">
          <span className="flex space-x-2">
            <span className="grid place-items-center">
              <IoPersonSharp size={20} className="text-blue-700" />
            </span>
            <span>Freelancer Identity</span>
          </span>
          <span className="hover:text-blue-700 cursor-pointer font-semibold hover:underline">
            Verify
          </span>
        </div>
        <div className="py-1 flex justify-between">
          <span className="flex space-x-2">
            <span className="grid place-items-center">
              <BiMoney size={20} className="text-blue-700" />
            </span>
            <span>Payment</span>
          </span>
          <span className="hover:text-blue-700 cursor-pointer font-semibold hover:underline">
            Verify
          </span>
        </div>
        <div className="py-1 flex justify-between">
          <span className="flex space-x-2">
            <span className="grid place-items-center">
              <AiOutlineMail size={20} className="text-blue-700" />
            </span>
            <span>Email Address</span>
          </span>
          {userData?.emailVerified ? (
            <span className="hover:text-blue-500 cursor-pointer">
              <BsFillPatchCheckFill size={22} className="text-green-700" />
            </span>
          ) : (
            <span
              onClick={() => navigate("/verify/email")}
              className="hover:text-blue-700 cursor-pointer font-semibold hover:underline"
            >
              Verify
            </span>
          )}
        </div>
        <div className="py-1 flex justify-between">
          <span className="flex space-x-2">
            <span className="grid place-items-center">
              <AiFillPhone size={20} className="text-blue-700" />
            </span>
            <span>Phone Number</span>
          </span>
          {userData?.phoneVerified ? (
            <span className="hover:text-blue-500 cursor-pointer">
              <BsFillPatchCheckFill size={22} className="text-green-700" />
            </span>
          ) : (
            <span
              onClick={() => navigate("/verify/phone")}
              className="hover:text-blue-700 cursor-pointer font-semibold hover:underline"
            >
              Verify
            </span>
          )}
        </div>
      </div>
    </main>
  );
};

export default verifications;
