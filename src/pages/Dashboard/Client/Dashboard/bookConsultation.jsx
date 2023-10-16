import { useNavigate } from "react-router-dom";

const bookConsultation = () => {
  const navigate = useNavigate();

  const handleDetails = () => {
    navigate("/dashboard/client/book/details");
  };
  const handleCall = () => {
    navigate("/dashboard/client/book/call");
  };

  return (
    <div className="mt-14 grid place-items-center">
      <div className="mt-24 h-[80vh] w-2/3">
        <h2 className="text-2xl font-semibold grid place-items-center py-2">
          Get Guidance
        </h2>
        <p className="text-base leading-8 text-center">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex assumenda
          odit neque, illum blanditiis nam maiores ipsum possimus ullam quisquam
          quae dolorum omnis, dolor ipsam quod perspiciatis sit voluptas vero.
        </p>
        <section className="flex flex-col gap-2 items-center">
          <button
            onClick={handleDetails}
            className="w-1/5 rounded-lg border-2 py-2 px-4 bg-blue-600 hover:bg-blue-800"
          >
            Fill in Details
          </button>
          <p>OR</p>
          <button
            onClick={handleCall}
            className="w-1/5 rounded-lg border-2 py-2 px-4 bg-blue-600 hover:bg-blue-800"
          >
            Book a Call
          </button>
        </section>
        <span
          className="font-semibold cursor-pointer py-2 my-6"
          onClick={() => navigate("/dashboard")}
        >
          <span className="px-4 py-2 rounded-lg bg-blue-300 hover:bg-blue-600 hover:text-white">
            Go Back
          </span>
        </span>
      </div>
    </div>
  );
};

export default bookConsultation;
