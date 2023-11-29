import { useNavigate } from "react-router-dom";

const BookConsultation = () => {
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
        <p className="text-base leading-8 text-center mb-2 py-3">
          Explore our expert consultation services to gain valuable insights and
          guidance for your business. Our experienced advisors are here to help
          you achieve your goals and overcome challenges.
        </p>
        <section className="flex flex-col gap-2 items-center my-2 py-2">
          <button
            onClick={handleDetails}
            className="w-1/5 rounded-lg border-2 font-semibold border-blue-700 py-2 px-4 bg-white hover:bg-blue-600 hover:text-white"
          >
            Fill in Details
          </button>
          <p className="font-semibold">OR</p>
          <button
            onClick={handleCall}
            className="w-1/5 rounded-lg border-2 font-semibold border-blue-700 py-2 px-4 bg-white hover:bg-blue-600 hover:text-white"
          >
            Book a Call
          </button>
        </section>
        <hr className="my-2 pb-2" />
        <span
          className="font-semibold cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          <span className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-800 text-white">
            Go Back
          </span>
        </span>
      </div>
    </div>
  );
};

export default BookConsultation;
