import { useState } from "react";
import { useNavigate } from "react-router-dom";

const call = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [date2, setDate2] = useState("");
  const [time, setTime] = useState("");
  const [time2, setTime2] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const navigate = useNavigate();

  const timeSlots = [
    "9:00 AM - 10:00AM",
    "10:00 AM - 11:00 AM",
    "2:00 PM - 3:00 PM",
    "4:00 PM - 5:00 PM",
  ];

  const totalSteps = 3; // Set the total number of steps here

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="flex flex-col justify-evenly h-fit">
            <h2 className="font-normal text-xl">Step 1: Service Selection</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-purple-200 rounded-lg p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-purple-200 rounded-lg p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-purple-200 rounded-lg p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="businessName">Business Name</label>
                <input
                  type="text"
                  id="businessName"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full bg-purple-200 rounded-lg p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description">PR Goals</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-purple-200 rounded-lg p-2"
                  rows="4"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="budget">What is your budget: </label>
                <select
                  onChange={(e) => setBudget(e.target.value)}
                  value={budget}
                  className="border-2 border-purple-800 rounded-lg h-10 py-2 px-4"
                >
                  <option>Below 5000</option>
                  <option>5000 - 15000</option>
                  <option>15000 - 35000</option>
                  <option>35000 - 55000</option>
                  <option>Over 55000</option>
                </select>
              </div>
            </form>
            <button
              className="w-1/5 rounded-lg border-2 mt-5 py-2 px-4 bg-purple-600 hover:bg-purple-800"
              onClick={handleNextStep}
            >
              Next
            </button>
          </div>
        );
      case 2:
        return (
          <div>
            <h2>Step 2: Call Details</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="businessName">Date</label>
                <input
                  type="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-purple-200 rounded-lg p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="businessName">Alternate Date(optional)</label>
                <input
                  type="date"
                  id="date2"
                  value={date2}
                  onChange={(e) => setDate2(e.target.value)}
                  className="w-full bg-purple-200 rounded-lg p-2"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="timeSlot">
                  Select Your Preferred Time Slot
                </label>
                <select
                  id="timeSlot"
                  onChange={(e) => setTime2(e.target.value)}
                  className="w-full bg-purple-200 rounded-lg p-2"
                >
                  {timeSlots.map((slot, index) => (
                    <option key={index} value={time}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="timeSlot">Alternate time slot (optional)</label>
                <select
                  id="timeSlot"
                  onChange={(e) => setTime2(e.target.value)}
                  className="w-full bg-purple-200 rounded-lg p-2"
                >
                  {timeSlots.map((slot, index) => (
                    <option key={index} value={time2}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </form>
            <button
              className="w-1/5 rounded-lg border-2 mx-4 py-2 px-4 bg-snow-100 hover:bg-purple-200"
              onClick={handlePrevStep}
            >
              Previous
            </button>
            <button
              className="w-1/5 rounded-lg border-2 py-2 px-4 bg-purple-600 hover:bg-purple-800"
              onClick={handleNextStep}
            >
              Next
            </button>
          </div>
        );
      case 3:
        return (
          <div>
            <h2>Step 2: Review and Confirmation</h2>

            <button
              className="w-1/5 rounded-lg border-2 mx-4 py-2 px-4 bg-snow-100 hover:bg-purple-200"
              onClick={handlePrevStep}
            >
              Edit
            </button>
            <button
              className="w-1/5 rounded-lg border-2 py-2 px-4 bg-green-600 hover:bg-green-800"
              onClick={handleNextStep}
            >
              Submit
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  const handleSubmit = () => {
    console.log("Data sent successfully!");
  };

  const handleGoBack = () => {
    navigate("/dashboard");
  };

  return (
    <div className="grid place-items-center">
      <div className="mt-24 h-[88vh] w-2/3 border-2 rounded-lg">
        <h1 className="font-semibold text-xl text-center py-2">
          Schedule a Call with an expert
        </h1>
        <h2 className="ml-4 cursor-pointer" onClick={handleGoBack}>
          <span className="font-bold">Go Back</span> To Dashboard
        </h2>
        <div className="border-b-2 mb-2 px-4 py-2">
          <div className="w-full h-2 bg-purple-200 rounded-full">
            <div
              className="h-2 bg-purple-700 rounded-full mt-5"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>
        <div className="py-4 px-4 w-full">{renderStepContent()}</div>
      </div>
    </div>
  );
};

export default call;
