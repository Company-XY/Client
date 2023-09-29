import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BsMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import { toggleDarkMode } from "../../store/Slices/darkMode";

import { removeUser } from "../../store/Slices/userSlice";
import { useNavigate } from "react-router-dom";
import light_logo from "../../assets/transparent_logo.png";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [scrolling, setScrolling] = useState(false);
  const [nav, setNav] = useState(false);
  const [darkIcon, setDarkIcon] = useState(true);

  const darkMode = useSelector((state) => state.darkMode.darkMode);

  const isAuthenticated = localStorage.getItem("user") !== null;
  const user = isAuthenticated
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const userName = user ? user.name : "";

  const handleDarkModeToggle = () => {
    dispatch(toggleDarkMode());
    setDarkIcon(!darkIcon);
  };

  const handleLogout = () => {
    dispatch(removeUser(user));
    navigate("/");
  };

  useEffect(() => {
    document.title = `Dashboard | Assist Africa`;
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`fixed w-full z-50 ${darkMode ? "dark" : ""} ${
          scrolling ? "bg-gray-200" : ""
        }`}
      >
        <nav className="bg-gray-100 border-gray-200 py-2.5 dark:bg-gray-900">
          {isAuthenticated ? (
            <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
              <div className="flex items-center cursor-pointer">
                {/*<img src={light_logo} className="h-6 mr-3 sm:h-9" alt="" />*/}
                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                  Assist.Africa
                </span>
              </div>
              <div className="flex items-center lg:order-2">
                <button
                  onClick={handleDarkModeToggle}
                  className="hidden md:flex text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                >
                  {darkIcon ? (
                    <BsMoonStarsFill size={20} />
                  ) : (
                    <BsFillSunFill size={20} />
                  )}
                </button>
                <RouterLink
                  to="/dashboard"
                  className="text-gray-800 hidden sm:flex dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                >
                  Profile
                </RouterLink>
                <button
                  onClick={handleLogout}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Logout
                </button>
                <button
                  onClick={() => setNav(!nav)}
                  data-collapse-toggle="mobile-menu-2"
                  type="button"
                  className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  aria-controls="mobile-menu-2"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <svg
                    className="hidden w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
              <div
                className="items-center hidden justify-between w-full lg:flex lg:w-auto lg:order-1"
                id="desktop-menu"
              >
                <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                  <li>
                    <RouterLink to="/">Home</RouterLink>
                  </li>
                  <li>
                    <RouterLink to="/dashboard">Dashboard</RouterLink>
                  </li>
                </ul>
              </div>
              {nav && (
                <div
                  className="items-center justify-between flex w-full lg:flex lg:w-auto lg:order-1"
                  id="mobile-menu-2"
                >
                  <ul
                    onClick={() => setNav(!nav)}
                    className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0"
                  >
                    <li>
                      <RouterLink to="/dashboard">Profile</RouterLink>
                    </li>
                    <li>
                      <p className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">
                        <span>{userName}</span>
                      </p>
                    </li>
                    <li className="grid place-items-center">
                      <button
                        onClick={handleDarkModeToggle}
                        to="/login"
                        className="text-gray-800 flex justify-start dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                      >
                        {darkIcon ? (
                          <span>
                            <BsMoonStarsFill size={20} />
                          </span>
                        ) : (
                          <span>
                            <BsFillSunFill size={20} />
                          </span>
                        )}
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
              <RouterLink to="/" className="flex items-center">
                {/*<img src={light_logo} className="h-5 sm:h-6 md:h-8" alt="" />*/}
                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                  Assist.Africa
                </span>
              </RouterLink>
              <div className="flex items-center lg:order-2">
                <button
                  onClick={handleDarkModeToggle}
                  className="hidden md:flex text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                >
                  {darkIcon ? (
                    <BsMoonStarsFill size={20} />
                  ) : (
                    <BsFillSunFill size={20} />
                  )}
                </button>
                <RouterLink
                  to="/login"
                  className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                >
                  Log in
                </RouterLink>
                <RouterLink
                  to="/register"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 dark:bg-blue-600 dark:hover-bg-blue-700 focus:outline-none dark:focus-ring-blue-800"
                >
                  Register
                </RouterLink>
                <button
                  onClick={() => setNav(!nav)}
                  data-collapse-toggle="mobile-menu-2"
                  type="button"
                  className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus-ring-gray-600"
                  aria-controls="mobile-menu-2"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <svg
                    className="hidden w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
              <div
                className="items-center hidden justify-between w-full lg:flex lg:w-auto lg:order-1"
                id="mobile-menu-2"
              >
                <ul
                  onClick={() => setNav(!nav)}
                  className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0"
                >
                  <li>
                    <RouterLink to="/">Home</RouterLink>
                  </li>
                  <li>
                    <RouterLink to="/#Section1">About Us</RouterLink>
                  </li>
                  <li>
                    <RouterLink to="/#Services">Services</RouterLink>
                  </li>
                  <li>
                    <RouterLink to="/#FAQ">FAQ</RouterLink>
                  </li>
                  <li>
                    <RouterLink to="/#Footer">Contact Us</RouterLink>
                  </li>
                </ul>
              </div>
              {nav && (
                <div
                  className="items-center justify-between w-full lg:flex lg:w-auto lg:order-1"
                  id="mobile-menu-2"
                >
                  <ul
                    onClick={() => setNav(!nav)}
                    className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0"
                  >
                    <li>
                      <RouterLink to="/">Home</RouterLink>
                    </li>
                    <li>
                      <RouterLink to="/#Section1">About Us</RouterLink>
                    </li>
                    <li>
                      <RouterLink to="/#Services">Services</RouterLink>
                    </li>
                    <li>
                      <RouterLink to="/#FAQ">FAQ</RouterLink>
                    </li>
                    <li>
                      <RouterLink to="/#Footer">Contact Us</RouterLink>
                    </li>
                    <li className="grid place-items-center">
                      <button
                        onClick={handleDarkModeToggle}
                        to="/login"
                        className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                      >
                        {darkIcon ? (
                          <span>
                            <BsMoonStarsFill size={20} />
                          </span>
                        ) : (
                          <span>
                            <BsFillSunFill size={20} />
                          </span>
                        )}
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </nav>
      </header>
    </>
  );
};

export default Header;
