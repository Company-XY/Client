import MyCalls from "./myCalls";
import MyDetails from "./myDetails";

const consultations = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold">My Consultations</h2>
      <hr className="border border-solid border-gray-500 my-4" />
      <div className="">
        <MyCalls />
        <hr />
        <MyDetails />
      </div>
    </div>
  );
};

export default consultations;
