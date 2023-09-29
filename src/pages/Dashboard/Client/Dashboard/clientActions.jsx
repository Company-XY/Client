import { useNavigate } from "react-router-dom";

const clientActions = () => {
  const navigate = useNavigate();
  const postJob = () => {
    navigate("/dashboard/client/post");
  };
  const consult = () => {
    navigate("/dashboard/client/book");
  };
  const depositFunds = () => {
    navigate("/deposit");
  };
  return (
    <div className="bg-snow-300 p-4 text-gray-800">
      <div className="mt-4 flex gap-4 items-center justify-center">
        <button
          onClick={depositFunds}
          className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition duration-300 ease-in-out"
        >
          Deposit funds
        </button>
        <button
          onClick={postJob}
          className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition duration-300 ease-in-out"
        >
          Post A Project
        </button>
        {/*<p className="text-center my-4">OR</p>*/}
        <button
          onClick={consult}
          className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition duration-300 ease-in-out"
        >
          Get Guidance
        </button>
      </div>
    </div>
  );
};

export default clientActions;
