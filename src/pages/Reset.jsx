import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaUserShield } from "react-icons/fa";

const Reset = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://auth-server-0bsp.onrender.com/api/v1/reset",
        { email }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage("User Not Found");
    }
  };

  return (
    <main className="bg-cover bg-fixed px-5 md:px-10 py-5 grid place-items-center sm:bg-gray-100 w-full h-screen">
      <section className="mx-auto w-full max-w-md bg-white p-8 rounded-lg sm:shadow-md md:w-2/3 lg:w-1/2">
        <h2 className="text-center text-lg md:text-2xl pb-2 mb-2 font-semibold">
          Enter your correct email address to reset password
        </h2>
        <form onSubmit={handleResetPassword}>
          <div className="flex flex-col gap-2">
            <label className="flex gap-2" htmlFor="email">
              <span>
                <FaUserShield size={20} />
              </span>{" "}
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
          <p className="py-2 my-2">{message}</p>
          <div className="w-full text-center grid place-items-center mt-2 pt-2">
            <button
              type="submit"
              className="bg-white w-full flex justify-center items-center text-blue-500 py-2 px-6 rounded-full text-lg md:text-xl font-semibold hover:bg-blue-600 hover:text-white focus:ring-2 focus:ring-blue-500 transition duration-300"
            >
              <span className="flex text-center">
                <span className="items-center">Reset Password</span>
              </span>
            </button>
          </div>
        </form>
        <div className="mt-3 pt-2 flex flex-col gap-2">
          <p>
            <span className="font-semibold">
              <Link to="/login">Login instead</Link>
            </span>
          </p>
          <p>
            New to Assist Africa? Signup{" "}
            <span className="font-semibold">
              <Link to="/register">Here</Link>
            </span>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Reset;
