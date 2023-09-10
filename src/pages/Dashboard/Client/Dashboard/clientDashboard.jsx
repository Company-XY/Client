import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../../../store/Slices/userSlice";
import Profile from "../Profile/updateProfile";

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
        `https://assist-api-okgk.onrender.com/api/v1/profile/${userId}`,
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
    <div className="px-10 pt-5">
      {isLoading ? (
        <p>Wait</p>
      ) : (
        <div className="px-5 py-2">
          {userData && userData.isApproved ? (
            <section>
              <h2>Dashboard default. main dashboard should be imported here</h2>
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
