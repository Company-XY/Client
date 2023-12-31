import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/Slices/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill, BsFillPersonCheckFill } from "react-icons/bs";

const FreelancerRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("Experienced Freelancer");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setPasswordError("");

    if (password === password2) {
      try {
        const response = await axios.post(
          "https://assist-api-5y59.onrender.com/api/v1/register/freelancer",
          {
            type,
            name,
            email,
            password,
          }
        );

        const user = response.data;
        setIsLoading(false);
        dispatch(setUser(user));
        navigate("/dashboard");
      } catch (error) {
        setError(error.response.data.message);
        setIsLoading(false);
      }
    } else {
      setPasswordError("Passwords Do not Match");
      setIsLoading(false);
    }
  };

  const handleShowPassChange = () => {
    setShowPass(!showPass);
  };

  return (
    <main className="max-w-3xl mx-auto mt-10 px-5 md:px-10 py-5 flex justify-center items-center w-full h-full">
      <section className="w-full bg-white mt-6 p-4 md:p-8 rounded-xl md:shadow-lg">
        <h2 className="text-center font-semibold text-2xl pb-2 mb-2">
          Enter correct credentials to join Assist Africa as a Freelancer
        </h2>
        <form onSubmit={handleRegister}>
          <div className="flex flex-col gap-2 py-2 mb-2">
            <label className="font-semibold text-blue-800">Account Type</label>
            <select
              className="w-full px-4 py-2 rounded-lg focus:outline-none border focus:ring-2 focus:ring-blue-500 mb-2"
              value={type}
              required
              onChange={(e) => setType(e.target.value)}
            >
              <option value="Intermediate Freelancer">
                Intermediate Freelancer
              </option>
              <option value="Experienced Freelancer">
                Experienced Freelancer
              </option>
              <option value="Agency Freelancer">Agency Freelancer</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 my-2">
            <label
              className="flex gap-2 font-semibold text-blue-800"
              htmlFor="name"
            >
              <BsFillPersonCheckFill size={20} />
              Username
            </label>
            <input
              className="w-full px-4 py-2 rounded-lg focus:outline-none border focus:ring-2 focus:ring-blue-500 mb-2"
              type="text"
              required
              placeholder=""
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              className="flex gap-2 font-semibold text-blue-800"
              htmlFor="email"
            >
              <FaUserShield size={20} />
              Email Address
            </label>
            <input
              className="w-full px-4 py-2 rounded-lg focus:outline-none border focus:ring-2 focus:ring-blue-500 mb-2"
              type="email"
              required
              placeholder=""
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 py-2">
            <label
              className="flex gap-2 mt-2 font-semibold text-blue-800"
              htmlFor="password"
            >
              <BsFillShieldLockFill size={20} />
              Password
            </label>
            <input
              className="w-full px-4 py-2 rounded-lg focus:outline-none border focus:ring-2 focus:ring-blue-500 mb-2"
              type={showPass ? "text" : "password"}
              required
              placeholder=""
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 py-2 ">
            <label
              className="flex gap-2 mt-2 font-semibold text-blue-800"
              htmlFor="password"
            >
              <BsFillShieldLockFill size={20} />
              Confirm Password
            </label>
            <input
              className="w-full px-4 py-2 rounded-lg focus:outline-none border focus:ring-2 focus:ring-blue-500 mb-2"
              type={showPass ? "text" : "password"}
              required
              placeholder=""
              onChange={(e) => setPassword2(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <label htmlFor="showPass" className="font-semibold">
              Show Password
            </label>
            <input
              type="checkbox"
              checked={showPass}
              onChange={handleShowPassChange}
              className={`${
                showPass ? "text-blue-800" : "text-black"
              } appearance-none h-6 w-6 border border-gray-300 rounded-md checked:bg-blue-800 checked:border-transparent focus:outline-none`}
            />
          </div>
          {error && (
            <div className="mt-2 flex items-center justify-center space-x-2 bg-red-200 text-red-700 font-semibold px-4 py-2 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 inline-block"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <span>{error}</span>
            </div>
          )}
          {passwordError && (
            <div className="mt-2 flex items-center justify-center space-x-2 bg-red-200 text-red-700 font-semibold px-4 py-2 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 inline-block"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <span>{passwordError}</span>
            </div>
          )}
          <div className="w-full text-center grid place-items-center my-2 py-2">
            <button
              type="submit"
              className="w-full bg-blue-700 hover:bg-blue-800 h-fit grid place-items-center text-white font-medium py-2 rounded-lg"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
              ) : (
                "Register"
              )}
            </button>
          </div>
        </form>
        <p className="py-2 text-center">
          Register as a Client instead{" "}
          <Link to="/register/client" className="font-semibold text-blue-800">
            Here
          </Link>
        </p>
        <p className="py-2 text-center">
          Already have an account?{" "}
          <span className="font-semibold text-blue-800">
            <Link to="/login">Login</Link>
          </span>
        </p>
      </section>
    </main>
  );
};

export default FreelancerRegister;
