import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../store/Slices/userSlice";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaBell } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import DarkModeToggle from "./toggle";
import axios from "axios";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const darkMode = useSelector((state) => state.darkMode.darkMode);

  const isAuthenticated = localStorage.getItem("user") !== null;
  const user = isAuthenticated
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const handleLogin = () => {
    navigate("/login");
  };
  const handleLogout = () => {
    dispatch(removeUser(user));
    navigate("/");
  };

  useEffect(() => {
    document.title = `Dashboard | Assist Africa`;
  }, []);

  const fetchNotifications = async (id, token) => {
    try {
      const userObjectString = localStorage.getItem("user");
      const userObject = JSON.parse(userObjectString);
      const id = userObject._id;
      const token = userObject.token;

      const response = await axios.get(
        `https://assist-api-5y59.onrender.com/api/v1/user/notifications/all/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotifications(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user) {
      const { _id: id, token } = user;
      fetchNotifications(id, token);
    }
  }, [user]);

  const markNotificationAsRead = async (notificationId) => {
    try {
      const userObjectString = localStorage.getItem("user");
      const userObject = JSON.parse(userObjectString);
      const userId = userObject._id;

      if (userId) {
        const response = await axios.patch(
          `https://assist-api-5y59.onrender.com/api/v1/user/${userId}/notifications/${notificationId}/read`,
          {},
          {
            headers: {
              Authorization: `Bearer ${userObject.token}`,
            },
          }
        );

        if (response.status === 200) {
          const updatedNotifications = notifications.map((notification) =>
            notification._id === notificationId
              ? { ...notification, read: true }
              : notification
          );
          setNotifications(updatedNotifications);
        } else {
          console.error(`Unexpected response status: ${response.status}`);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <div className={`${darkMode ? "dark" : ""}`}>
          {" "}
          <nav className="bg-gray-100 dark:bg-gray-800">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="relative flex items-center justify-between h-16">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <button
                    type="button"
                    className="p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    aria-controls="mobile-menu"
                    aria-expanded={isMobileMenuOpen}
                    onClick={toggleMobileMenu}
                  >
                    <span className="sr-only">Open main menu</span>
                    {isMobileMenuOpen ? (
                      <FaTimes className="block h-6 w-6" />
                    ) : (
                      <FaBars className="block h-6 w-6" />
                    )}
                  </button>
                </div>
                <div className="flex-shrink-0 flex items-center">
                  <span className="text-blue-700 dark:text-blue-100 cursor-pointer hover:scale-105 font-bold text-base sm:text-lg md:text-2xl ml-14">
                    Assist Africa
                  </span>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-4 dark:text-blue-100">
                  <RouterLink
                    to="/dashboard"
                    className="hover:text-blue-700 hover:font-semibold hover:scale-105 text-gray rounded-md px-3 py-2 text-base font-medium"
                  >
                    Dashboard
                  </RouterLink>
                  <RouterLink
                    to="/blog"
                    className="hover:text-blue-700 hover:font-semibold hover:scale-105 text-gray rounded-md px-3 py-2 text-base font-medium"
                  >
                    Resource Center
                  </RouterLink>
                  {user.role === "Freelancer" ? (
                    <RouterLink
                      to={`/freelancer/${user._id}`}
                      className="hover:text-blue-700 hover:font-semibold hover:scale-105 text-gray rounded-md px-3 py-2 text-base font-medium"
                    >
                      Profile
                    </RouterLink>
                  ) : null}
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <div className="relative ml-5">
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setNotification(!notification)}
                        className="flex rounded-full text-sm focus:outline-none "
                        id="user-menu-button"
                        aria-expanded="false"
                        aria-haspopup="true"
                      >
                        <span className="sr-only">View notifications</span>
                        <FaBell
                          size={24}
                          className="text-blue-700 dark:text-blue-100 grid place-items-center"
                        />
                      </button>
                      {Array.isArray(notifications) &&
                        notifications.some(
                          (notification) => !notification.read
                        ) && (
                          <div className="absolute -top-2 -right-2 h-4 w-4 bg-green-600 text-white text-xs rounded-full flex items-center justify-center">
                            {
                              notifications.filter(
                                (notification) => !notification.read
                              ).length
                            }
                          </div>
                        )}
                    </div>

                    <div
                      className={`absolute right-0 z-10 mt-2 w-72 md:w-96 h-72 md:h-96 max-h-screen/2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
                        notification ? "block" : "hidden"
                      } overflow-y-auto`}
                      role="menu"
                      id="notification-container"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu-button"
                      tabIndex="-1"
                    >
                      <div className="py-2 px-4 w-full max-h-[50vh]">
                        <div className="py-1 px-1">
                          <div className="flex justify-between px-2 sticky top-0 bg-white z-10 my-2">
                            <h2 className="font-semibold text-center">
                              Notifications
                            </h2>
                            <p
                              onClick={() => setNotification(!notification)}
                              className="cursor-pointer flex justify-between bg-blue-100 hover:bg-blue-500 hover:text-white py-1 px-2 rounded-lg"
                            >
                              <span className="grid place-items-center font-semibold">
                                Close
                              </span>
                              <span className="text-center mt-1">
                                <FaTimes
                                  size={16}
                                  className="text-center ml-1"
                                />
                              </span>
                            </p>
                          </div>
                          <hr className="my-2" />
                          {notifications && notifications.length > 0 ? (
                            notifications
                              .slice()
                              .sort(
                                (a, b) =>
                                  new Date(b.timestamp) - new Date(a.timestamp)
                              )
                              .map((notification) => (
                                <div
                                  key={notification._id}
                                  className={`border p-4 mb-4 ${
                                    notification.read
                                      ? "bg-gray-200"
                                      : "bg-blue-200"
                                  }`}
                                  onClick={() =>
                                    markNotificationAsRead(notification._id)
                                  }
                                  style={{ cursor: "pointer" }}
                                >
                                  <div className="font-semibold">
                                    {notification.message}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {new Date(
                                      notification.timestamp
                                    ).toLocaleString()}
                                  </div>
                                </div>
                              ))
                          ) : (
                            <div className="text-center font-light italic my-2">
                              No notifications
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div
                      onClick={() => setNotification(!notification)}
                      className={`absolute right-0 z-20 mt-2 w-6 h-6 rounded-full bg-transparent`}
                      style={{ pointerEvents: "auto" }}
                    ></div>
                  </div>

                  <div className="relative ml-5">
                    <div>
                      <button
                        type="button"
                        onClick={() => setOpen(!open)}
                        className="flex rounded-full text-sm"
                        id="user-menu-button"
                        aria-expanded="false"
                        aria-haspopup="true"
                      >
                        <span className="sr-only">Open user menu</span>
                        {/*<img
                          className="h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOj12 &auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                    />*/}
                        <BsFillPersonFill
                          className="text-blue-700 grid place-items-center dark:text-blue-100"
                          size={30}
                        />
                      </button>
                    </div>
                    <div
                      onClick={() => setOpen(!open)}
                      className={`absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
                        open ? "block" : "hidden"
                      }`}
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu-button"
                      tabIndex="-1"
                    >
                      {user.role === "Client" ? (
                        <RouterLink
                          to="/client/update_profile"
                          className="block px-4 py-2 text-sm text-gray-700"
                          role="menuitem"
                          tabIndex="-1"
                        >
                          Update Profile
                        </RouterLink>
                      ) : (
                        <RouterLink
                          to="/freelancer/update_profile"
                          className="block px-4 py-2 text-sm text-gray-700"
                          role="menuitem"
                          tabIndex="-1"
                        >
                          Update Profile
                        </RouterLink>
                      )}
                      {user.role === "Client" ? (
                        <RouterLink
                          to="/deposit"
                          className="block px-4 py-2 text-sm text-gray-700"
                          role="menuitem"
                          tabIndex="-1"
                        >
                          Deposit Funds
                        </RouterLink>
                      ) : (
                        <RouterLink
                          to="/withdraw"
                          className="block px-4 py-2 text-sm text-gray-700"
                          role="menuitem"
                          tabIndex="-1"
                        >
                          Withdraw Funds
                        </RouterLink>
                      )}

                      <div
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                        role="menuitem"
                        tabIndex="-1"
                        onClick={handleLogout}
                      >
                        Sign out
                      </div>
                    </div>
                  </div>
                  <span>
                    <DarkModeToggle />
                  </span>
                </div>
              </div>
            </div>
            <div
              className={`sm:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}
              id="mobile-menu"
            >
              <div
                className="flex flex-col px-2 pt-2 pb-3 space-y-2"
                onClick={toggleMobileMenu}
              >
                <RouterLink
                  to="/dashboard"
                  className="hover:text-blue-700 hover:font-semibold hover:scale-105 text-gray rounded-md px-3 py-2 text-sm font-medium"
                  onClick={toggleMobileMenu}
                >
                  Dashboard
                </RouterLink>
                <RouterLink
                  to="/blog"
                  className="hover:text-blue-700 hover:font-semibold hover:scale-105 text-gray rounded-md px-3 py-2 text-sm font-medium"
                  onClick={toggleMobileMenu}
                >
                  Resource Center
                </RouterLink>
                {user.role === "Freelancer" ? (
                  <RouterLink
                    to={`/freelancer/${user._id}`}
                    className="hover:text-blue-700 hover:font-semibold hover:scale-105 text-gray rounded-md px-3 py-2 text-base font-medium"
                    onClick={toggleMobileMenu}
                  >
                    Profile
                  </RouterLink>
                ) : null}
                <span className="grid place-items-center">
                  <DarkModeToggle />
                </span>
              </div>
            </div>
          </nav>
        </div>
      ) : (
        <>
          {" "}
          <nav className="bg-gray-100">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="relative flex items-center justify-between h-16">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <button
                    type="button"
                    className="p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    aria-controls="mobile-menu"
                    aria-expanded={isMobileMenuOpen}
                    onClick={toggleMobileMenu}
                  >
                    <span className="sr-only">Open main menu</span>
                    {isMobileMenuOpen ? (
                      <FaTimes className="block h-6 w-6" />
                    ) : (
                      <FaBars className="block h-6 w-6" />
                    )}
                  </button>
                </div>
                <div className="flex-shrink-0 flex items-center">
                  <RouterLink to="/">
                    <span className="text-blue-700 cursor-pointer hover:scale-105 font-bold text-lg sm:text-xl md:text-2xl ml-14">
                      Assist Africa
                    </span>
                  </RouterLink>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
                  <ScrollLink
                    to="Hero"
                    duration={600}
                    smooth={true}
                    className="hover:text-blue-700 font-semibold hover:scale-105 text-gray rounded-md px-3 py-2 text-base cursor-pointer"
                  >
                    Home
                  </ScrollLink>
                  <ScrollLink
                    to="Section1"
                    duration={600}
                    smooth={true}
                    className="hover:text-blue-700 font-semibold hover:scale-105 text-gray rounded-md px-3 py-2 text-base cursor-pointer"
                  >
                    About Us
                  </ScrollLink>
                  <ScrollLink
                    to="Services"
                    duration={600}
                    smooth={true}
                    className="hover:text-blue-700 font-semibold hover:scale-105 text-gray rounded-md px-3 py-2 text-base cursor-pointer"
                  >
                    Services
                  </ScrollLink>
                  <ScrollLink
                    to="FAQ"
                    duration={600}
                    smooth={true}
                    className="hover:text-blue-700 font-semibold hover:scale-105 text-gray rounded-md px-3 py-2 text-base cursor-pointer"
                  >
                    FAQ's
                  </ScrollLink>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <div className="flex space-x-4 text-sm font-medium">
                    <RouterLink
                      to="/register"
                      className="hidden sm:grid place-items-center text-md py-1 px-3 bg-white hover:bg-blue-700 rounded-lg hover:text-white font-semibold"
                    >
                      Get Started
                    </RouterLink>
                    <button
                      onClick={handleLogin}
                      className="grid place-items-center text-md py-1 px-3 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-500"
                    >
                      Login
                    </button>
                    <span>
                      <DarkModeToggle />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`sm:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}
              id="mobile-menu"
              onClick={toggleMobileMenu}
            >
              <div
                className="px-2 pt-2 pb-3 space-y-1"
                onClick={toggleMobileMenu}
              >
                <ScrollLink
                  to="Hero"
                  duration={600}
                  smooth={true}
                  className="text-gray-800 hover:bg-blue-100 hover:text-gray block px-3 py-2 rounded-md text-base font-medium"
                  aria-current="page"
                  onClick={toggleMobileMenu}
                >
                  Home
                </ScrollLink>
                <ScrollLink
                  to="Section1"
                  duration={600}
                  smooth={true}
                  className="text-gray-800 hover:bg-blue-100 hover:text-gray block px-3 py-2 rounded-md text-base font-medium"
                  onClick={toggleMobileMenu}
                >
                  About Us
                </ScrollLink>
                <ScrollLink
                  to="Services"
                  duration={600}
                  smooth={true}
                  className="text-gray-800 hover:bg-blue-100 hover:text-gray block px-3 py-2 rounded-md text-base font-medium"
                  aria-current="page"
                  onClick={toggleMobileMenu}
                >
                  Services
                </ScrollLink>
                <ScrollLink
                  to="FAQ"
                  duration={600}
                  smooth={true}
                  className="text-gray-800 hover:bg-blue-100 hover:text-gray block px-3 py-2 rounded-md text-base font-medium"
                  onClick={toggleMobileMenu}
                >
                  FAQ's
                </ScrollLink>
                <ScrollLink
                  to="Footer"
                  duration={600}
                  smooth={true}
                  className="text-gray-800 hover:bg-blue-100 hover:text-gray block px-3 py-2 rounded-md text-base font-medium"
                  onClick={toggleMobileMenu}
                >
                  Contact Us
                </ScrollLink>
                <hr />
                <RouterLink
                  to="/register"
                  className="flex py-1 px-3 bg-white border-2 rounded-lg border-blue-600 hover:text-blue-700 font-semibold"
                  onClick={toggleMobileMenu}
                >
                  Get Started
                </RouterLink>
                <span className="grid place-items-center">
                  <DarkModeToggle />
                </span>
              </div>
            </div>
          </nav>
        </>
      )}
    </div>
  );
};

export default Header;
