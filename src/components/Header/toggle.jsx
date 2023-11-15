import { useState } from "react";
import { BsFillSunFill, BsMoonFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { toggleDarkMode } from "../../store/Slices/darkMode";

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
      className="hidden md:grid place-items-center text-blue-800 dark:text-white mx-2 ml-2"
    >
      {darkIcon ? (
        <BsMoonFill className="mt-1" size={20} />
      ) : (
        <BsFillSunFill size={20} className="mt-1" />
      )}
    </button>
  );
};

export default DarkModeToggle;
