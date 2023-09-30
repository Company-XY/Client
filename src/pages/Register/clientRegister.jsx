import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/Slices/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill, BsFillPersonCheckFill } from "react-icons/bs";

const ClientRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");
  const [consultation, setConsultation] = useState(true);
  const [type, setType] = useState("Individual Client");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (password === password2) {
      try {
        const response = await axios.post(
          "https://assist-api-okgk.onrender.com/api/v1/register/client",
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
        <h2 className="text-center font-semibold text-lg md:text-2xl pb-2 mb-2">
          Enter correct credentials to join Assist Africa as a Client
        </h2>
        <p className="py-2 mb-2">
          Register as a Freelancer instead{" "}
          <Link
            to="/register/freelancer"
            className="font-semibold text-blue-800"
          >
            Here
          </Link>
        </p>
        <form onSubmit={handleRegister}>
          <div className="flex flex-col gap-2 py-2 mb-2">
            <label className="font-semibold">Account Type</label>
            <select
              className="w-full px-4 py-2 rounded-lg focus:outline-none border focus:ring-2 focus:ring-blue-500 mb-2"
              value={type}
              required
              onChange={(e) => setType(e.target.value)}
            >
              <option value="Inidividual Client">Individual</option>
              <option value="Business Client">Business</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 my-2">
            <label className="flex gap-2 font-semibold" htmlFor="name">
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
            <label className="flex gap-2 font-semibold" htmlFor="email">
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
            <label className="flex gap-2 mt-2 font-semibold" htmlFor="password">
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
          <div className="flex flex-col gap-2 py-2">
            <label className="flex gap-2 mt-2 font-semibold" htmlFor="password">
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
          {error && <p className="text-red-400 py-2 my-2">{error}</p>}
          {passwordError && (
            <p className="text-red-400 py-2 my-2">{passwordError}</p>
          )}
          <div className="w-full text-center grid place-items-center">
            <button
              type="submit"
              className="bg-white w-full flex justify-center items-center text-blue-500 py-2 px-6 rounded-full text-lg md:text-xl font-semibold hover:bg-blue-600 hover:text-white focus:ring-2 focus:ring-blue-500 transition duration-300"
            >
              <span className="items-center">
                {isLoading ? (
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                ) : (
                  <span>Register</span>
                )}
              </span>
            </button>
          </div>
        </form>
        <p className="py-2 mt-2">
          Already have an account?{" "}
          <span className="font-semibold">
            <Link to="/login">Login</Link>
          </span>
        </p>
      </section>
    </main>
  );
};

export default ClientRegister;
