import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaUserShield } from "react-icons/fa";

const Reset = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSucess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");
      const response = await axios.post(
        "https://assist-api-5y59.onrender.com/api/v1/password",
        { email }
      );
      setSucess(true);
      setLoading(false);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setMessage(error.response.data.message);
      } else if (error.message) {
        setMessage(error.message);
      } else {
        setMessage("An error occurred while processing your request.");
      }
      setSucess(false);
      setLoading(false);
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
            <label className="flex gap-2 text-blue-800" htmlFor="email">
              <span>
                <FaUserShield size={20} />
              </span>{" "}
              Email Address
            </label>
            <input
              className="w-full px-4 py-2 rounded-lg focus:outline-none border focus:ring-2 focus:ring-blue-500 my-2"
              type="email"
              required
              placeholder=""
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <p className=" text-red-600">{message}</p>
          {success && (
            <p className=" text-green-600">
              Check your email for the reset link
            </p>
          )}
          <div className="w-full text-center grid place-items-center mt-2 pt-2">
            <button
              type="submit"
              className="w-full bg-blue-700 hover:bg-blue-800 h-fit grid place-items-center text-white font-medium py-2 rounded-lg"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
              ) : (
                "Reset Password"
              )}
            </button>
          </div>
        </form>
        <div className="mt-3 pt-2 flex flex-col gap-2">
          <p className="text-center">
            <span className="font-semibold text-blue-700">
              <Link to="/login">Login instead</Link>
            </span>
          </p>
          <p className="text-center">
            New to Assist Africa? Signup{" "}
            <span className="font-semibold text-blue-700">
              <Link to="/register">Here</Link>
            </span>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Reset;
