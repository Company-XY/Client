import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../../../store/Slices/userSlice";
import Profile from "../Profile/createProfile";
import Dashboard from "./dashboard";
import Skeleton from "../../../Loading";

const clientDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

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
    <div className="pt-5 max-w-5xl mx-auto">
      {isLoading ? (
        <Skeleton />
      ) : (
        <div className="md:px-2 md:py-2">
          {userData && userData.isApproved ? (
            <section>
              <Dashboard />{" "}
            </section>
          ) : (
            <Profile />
          )}
        </div>
      )}
    </div>
  );
};

export default clientDashboard;
