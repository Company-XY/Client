import { AiFillPlusCircle } from "react-icons/ai";

const portfolio = () => {
  return (
    <>
      <main className="bg-blue-100 rounded-md p-2">
        <h2 className="flex justify-between px-4 my-1">
          <span className="font-semibold text-center text-lg">
            Portfolio Items
          </span>
          <span>
            <button className="font-semibold p-1 bg-blue-500 rounded-md text-white">
              Manage
            </button>
          </span>
        </h2>
        <hr className="border-t-2 border-blue-700" />
        <section className="w-full h-52 flex flex-col justify-between">
          <div className="text-center pt-4">
            <p>No Portfolio Items have been added!</p>
          </div>
          <div className="grid place-items-center">
            <button className="px-4 py-2 flex justify-center space-x-2 bg-blue-200 rounded-md hover:bg-blue-700 font-semibold hover:text-white">
              <span className="grid place-items-center">Add Items</span>
              <span className="grid place-items-center">
                <AiFillPlusCircle size={20} />
              </span>
            </button>
          </div>
        </section>
      </main>
    </>
  );
};

export default portfolio;