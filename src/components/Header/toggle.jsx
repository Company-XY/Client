import React, { useState, useEffect } from "react";
import { BsMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../../store/Slices/darkMode";
import { removeUser } from "../../store/Slices/userSlice";
import { useNavigate } from "react-router-dom";

const DarkModeToggle = () => {
  const dispatch = useDispatch();
  const [darkIcon, setDarkIcon] = useState(true);

  const handleDarkModeToggle = () => {
    dispatch(toggleDarkMode());
    setDarkIcon(!darkIcon);
  };

  return (
    <button
      onClick={handleDarkModeToggle}
      className="hidden md:flex text-blue-800 dark:text-white dark:bg-gray-800 hover:bg-blue-50 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 dark:hover-bg-blue-200"
    >
      {darkIcon ? <BsMoonStarsFill size={21} /> : <BsFillSunFill size={24} />}
    </button>
  );
};

export default DarkModeToggle;
