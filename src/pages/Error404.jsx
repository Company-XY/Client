import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Error404 = () => {
  const [authed, setAuthed] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userObjectString = localStorage.getItem("user");

    if (!userObjectString) {
      setAuthed(false);
    } else {
      const userObject = JSON.parse(userObjectString);

      if (!userObject.token) {
        setAuthed(false);
      }
    }
  }, []);

  return (
    <div className="min-h-[93vh] flex items-center justify-center bg-blue-100">
      <div className="bg-white rounded-lg p-8 shadow-md w-96">
        <h1 className="text-2xl font-bold mb-2 text-center">
          Under Construction
        </h1>
        <p className="text-gray-700 mb-4 text-center">
          The page you requested is not available.
        </p>
        {authed ? (
          <div className="space-x-4 text-center">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </button>
          </div>
        ) : (
          <div className="space-x-4 text-center">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
              onClick={() => navigate("/")}
            >
              Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Error404;
