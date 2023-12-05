import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VerifyPhone = () => {
  const [userData, setUserData] = useState(null);
  const [codeSent, setCodeSent] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");
  const [verificationError, setVerificationError] = useState(null);
  const userObjectString = localStorage.getItem("user");
  const userObject = JSON.parse(userObjectString);
  const navigate = useNavigate();

  const userId = userObject?._id;
  const token = userObject?.token;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://assist-api-5y59.onrender.com/api/v1/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUserData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleRequest = () => {
    const phoneNumber = userData?.phone;
    const userObject = JSON.parse(localStorage.getItem("user"));
    const token = userObject?.token;

    setLoading(true);
    axios
      .post(
        "https://assist-api-5y59.onrender.com/api/v1/verify/phone",
        { phoneNumber },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setCodeSent(true);
      })
      .catch((error) => {
        console.error("Failed to send the verification code:", error);
      });
  };

  const handleVerify = (e) => {
    e.preventDefault();
    const phoneNumber = userData?.phone;
    const userObject = JSON.parse(localStorage.getItem("user"));
    const token = userObject?.token;

    setVerificationError(null);

    axios
      .post(
        "https://assist-api-5y59.onrender.com/api/v1/verify/phone/code",
        { phoneNumber, code },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setSuccess(true);
      })
      .catch((error) => {
        setVerificationError("Invalid code. Please try again.");
        console.error("Failed to verify the code:", error);
      });
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <section className="w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 border-2 rounded-lg py-4 px-6 bg-white">
        <div className="text-center my-4 py-2">
          <span
            className="font-semibold cursor-pointer py-2 my-6"
            onClick={() => navigate(`/freelancer/${userId}`)}
          >
            <span className="px-4 py-2 rounded-lg bg-blue-300 hover:bg-blue-600 hover:text-white">
              Go Back
            </span>
          </span>
        </div>
        <main className="px-5">
          <h2 className="font-semibold text-2xl text-gray-700 mb-2 text-center">
            Phone Number Verification
          </h2>
          <hr className="border-t-2 border-blue-700 mb-4" />
          {success ? (
            <div className="grid place-items-center">
              <p className="bg-gray-200 text-green-600">
                Phone Number Verified Successfully
              </p>
              <button
                onClick={() => navigate(`/freelancer/${userId}`)}
                className="py-1 px-3 bg-blue-200 text-center"
              >
                Return to Profile
              </button>
            </div>
          ) : (
            <div>
              {codeSent ? (
                <div>
                  <p className="text-gray-700 text-center mb-3">
                    Enter the 6-digit code sent to your phone number
                  </p>
                  <div className="mb-4">
                    <form>
                      <input
                        onChange={(e) => setCode(e.target.value)}
                        type="text"
                        id="verificationCode"
                        placeholder="Code"
                        minLength={6}
                        maxLength={6}
                        required
                        className="w-full px-4 py-2 rounded-lg border-2 border-blue-700"
                      />
                      {verificationError && (
                        <p className="text-red-600 text-base pt-2 text-center">
                          {verificationError}
                        </p>
                      )}
                      <div className="mt-4 text-center">
                        <button
                          onClick={handleVerify}
                          className="bg-blue-700 text-white py-2 px-4 rounded-md hover-bg-blue-200"
                        >
                          Verify Phone
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-gray-700 text-center">
                    A 6-digit code will be sent to your phone number
                  </p>
                  <div className="mt-4 text-center">
                    <div className="rounded-lg py-1 px-3 text-blue-700 font-semibold">
                      {userData?.phone.combined}
                    </div>
                    <div className="mt-4 text-center">
                      <button
                        onClick={handleRequest}
                        className="bg-blue-700 text-white py-2 px-4 rounded-md hover-bg-blue-200"
                        disabled={!userData}
                      >
                        {isLoading ? "Please Wait" : "Request Code"}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </section>
    </div>
  );
};

export default VerifyPhone;
