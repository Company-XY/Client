import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/Slices/userSlice";
import Client from "./Client/Dashboard/clientDashboard";
import Freelancer from "./Freelancer/Dashboard/freelancerDashboard";
import Skeleton from "../Loading2";
import Admin from "./Admins/Admins";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userString = localStorage.getItem("user");

    if (userString) {
      const user = JSON.parse(userString);
      dispatch(setUser(user));
      fetchUserData(user._id, user.token);
    } else {
      navigate("/");
    }
  }, [dispatch, navigate]);

  const fetchUserData = async (userId, token) => {
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
      setTimeout(() => {
        setIsLoading(false);
      }, Math.random() * 10 + 30);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  return (
    <div className="mt-5 pt-2 px-1 sm:px-10">
      {isLoading ? (
        <Skeleton active={isLoading} />
      ) : (
        <div>
          {userData && userData.isAdmin ? (
            <Admin />
          ) : (
            <div className="md:px-5 md:py-2">
              {userData && userData.role === "Freelancer" ? (
                <Freelancer />
              ) : userData && userData.role === "Client" ? (
                <Client />
              ) : (
                <Admin />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
