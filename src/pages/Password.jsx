import { useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { RiLockPasswordFill } from "react-icons/ri";

const Password = () => {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [showPass, setShowPass] = useState(false);
  const userObjectString = localStorage.getItem("user");
  const userObject = JSON.parse(userObjectString);
  const token1 = userObject.token;

  const { token } = useParams();

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== password2) {
      setMessage("Passwords Do Not Match");
      setLoading(false);
    } else {
      try {
        const response = await axios.post(
          `https://assist-api-5y59.onrender.com/api/v1/reset/password`,
          { resetToken: token, newPassword: password },
          {
            headers: {
              Authorization: `Bearer ${token1}`,
            },
          }
        );
        if (response.status === 200) {
          setSuccess("Password updated successfully.");
          setPassword("");
          setLoading(false);
        } else {
          setMessage(
            "Password should comprise alphanumeric text with at least one special character."
          );
        }
      } catch (error) {
        setMessage("An error occurred while updating password.");
      }
    }
  };

  const handleShowPassChange = () => {
    setShowPass(!showPass);
  };

  return (
    <main className="bg-cover bg-fixed px-5 md:px-10 py-5 grid place-items-center sm:bg-gray-100 w-full h-screen">
      <section className="mx-auto w-full max-w-md bg-white p-8 rounded-lg sm:shadow-md md:w-2/3 lg:w-1/2">
        <h2 className="text-center text-xl md:text-2xl pb-2 mb-2">
          Create New Password for Assist Africa
        </h2>
        <form onSubmit={handlePasswordChange}>
          <div className="flex flex-col gap-2">
            <label className="flex gap-2" htmlFor="password">
              <span>
                <RiLockPasswordFill size={20} />
              </span>{" "}
              New Password
            </label>
            <input
              className="w-full px-4 py-2 rounded-lg focus:outline-none border focus:ring-2 focus:ring-blue-500 my-2"
              type={showPass ? "text" : "password"}
              required
              value={password}
              placeholder=""
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 mt-2 pt-2">
            <label className="flex gap-2" htmlFor="password">
              <span>
                <RiLockPasswordFill size={20} />
              </span>{" "}
              Confirm Password
            </label>
            <input
              className="w-full px-4 py-2 rounded-lg focus:outline-none border focus:ring-2 focus:ring-blue-500 my-2"
              type={showPass ? "text" : "password"}
              value={password2}
              required
              placeholder=""
              onChange={(e) => setPassword2(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <label htmlFor="showPass">Show Password</label>
            <input
              type="checkbox"
              checked={showPass}
              onChange={handleShowPassChange}
              className={`${
                showPass ? "text-blue-800" : "text-black"
              } appearance-none h-6 w-6 border border-gray-300 rounded-md checked:bg-blue-800 checked:border-transparent focus:outline-none`}
            />
          </div>
          <p className="text-red-400 py-2 my-2">{message}</p>
          <p className="text-green-400 py-2 my-2">{success}</p>
          <div className="w-full text-center grid place-items-center mt-2 pt-2">
            <button
              type="submit"
              className="w-full bg-blue-700 hover:bg-blue-800 h-fit grid place-items-center text-white font-medium py-2 rounded-lg"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
              ) : (
                "Update Password"
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

export default Password;
