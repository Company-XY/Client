import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/Slices/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "https://assist-api-5y59.onrender.com/api/v1/login",
        {
          email,
          password,
        }
      );

      const user = response.data;

      localStorage.setItem("user", JSON.stringify(user));

      setIsLoading(false);
      setLoading(false);

      navigate("/dashboard");
      dispatch(setUser(user));
      setLoading(false);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred. Please try again later.");
      }

      setIsLoading(false);
      setLoading(false);
    }
  };

  const handleShowPassChange = () => {
    setShowPass(!showPass);
  };

  return (
    <main className="w-full min-h-screen flex justify-center items-center">
      <section className="w-auto max-w-md p-8 rounded-lg sm:shadow-md md:w-2/3 lg:w-1/2 mt-20 bg-white md:bg-gray-100">
        <h2 className="text-center font-semibold text-3xl mb-6">
          Enter correct credentials to login
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="flex items-center text-blue-800 font-semibold"
            >
              <FaUserShield
                className="mr-2 grid place-items-center"
                size={20}
              />
              Email Address
            </label>
            <input
              type="email"
              value={email}
              required
              placeholder="Email"
              className="w-full px-4 py-2 rounded-lg focus:outline-none border focus:ring-2 focus:ring-blue-500 my-2"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="flex items-center text-blue-800 font-semibold"
            >
              <BsFillShieldLockFill
                className="mr-2 grid place-items-center"
                size={20}
              />
              Password
            </label>
            <input
              type={showPass ? "text" : "password"}
              value={password}
              required
              placeholder="Password"
              className="w-full px-4 py-2 rounded-lg focus:outline-none border focus:ring-2 focus:ring-blue-500 my-2"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="mt-2">
              <label htmlFor="showPass" className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={showPass}
                  onChange={handleShowPassChange}
                  className={`${
                    showPass ? "text-blue-800" : "text-black"
                  } appearance-none h-6 w-6 border border-gray-300 rounded-md checked:bg-blue-800 checked:border-transparent focus:outline-none`}
                />
                Show Password
              </label>
            </div>
          </div>
          <p className="text-red-600 mb-4">{error}</p>
          <div className="w-full text-center">
            <button
              type="submit"
              className="w-full bg-blue-700 hover:bg-blue-800 h-fit grid place-items-center text-white font-medium py-2 rounded-lg"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <p>
            Forgot Password? Reset{" "}
            <Link to="/reset" className="text-blue-800 font-semibold">
              Here
            </Link>
          </p>
          <p>
            New to Assist Africa? Signup{" "}
            <Link to="/register" className="text-blue-800 font-semibold">
              Here
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Login;
