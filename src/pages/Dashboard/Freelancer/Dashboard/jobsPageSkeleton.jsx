import React from "react";

const jobsPageSkeleton = () => {
  return (
    <div className="container mt-24 mx-auto">
      <h1 className="text-2xl font-bold mb-4 bg-gray-300 h-8 w-2/3 rounded"></h1>
      <form className="mb-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="budget"
              className="h-6 w-1/2 bg-gray-300 rounded"
            ></label>
            <input
              type="text"
              id="budget"
              name="budget"
              className="border border-gray-300 rounded p-2 w-full"
              disabled
            />
          </div>
          <div>
            <label
              htmlFor="duration"
              className="h-6 w-1/2 bg-gray-300 rounded"
            ></label>
            <input
              type="text"
              id="duration"
              name="duration"
              className="border border-gray-300 rounded p-2 w-full"
              disabled
            />
          </div>
          <div>
            <label
              htmlFor="skills"
              className="h-6 w-1/2 bg-gray-300 rounded"
            ></label>
            <input
              type="text"
              id="skills"
              name="skills"
              className="border border-gray-300 rounded p-2 w-full"
              disabled
            />
          </div>
          <div>
            <label
              htmlFor="search"
              className="h-6 w-1/2 bg-gray-300 rounded"
            ></label>
            <input
              type="text"
              id="search"
              name="search"
              className="border border-gray-300 rounded p-2 w-full"
              disabled
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 mt-2 rounded cursor-not-allowed"
          disabled
        >
          Loading
        </button>
      </form>
      <div className="grid grid-cols-1 gap-4">
        <div className="border border-gray-300 rounded p-4 animate-pulse">
          <h2 className="text-xl font-semibold bg-gray-300 h-6 w-2/3 rounded"></h2>
          <p className="bg-gray-300 h-4 w-2/3 rounded"></p>
          <p className="bg-gray-300 h-4 w-2/3 rounded"></p>
          <p className="bg-gray-300 h-4 w-2/3 rounded"></p>
          <p className="bg-gray-300 h-4 w-2/3 rounded"></p>
        </div>
        <div className="border border-gray-300 rounded p-4 animate-pulse">
          <h2 className="text-xl font-semibold bg-gray-300 h-6 w-2/3 rounded"></h2>
          <p className="bg-gray-300 h-4 w-2/3 rounded"></p>
          <p className="bg-gray-300 h-4 w-2/3 rounded"></p>
          <p className="bg-gray-300 h-4 w-2/3 rounded"></p>
          <p className="bg-gray-300 h-4 w-2/3 rounded"></p>
        </div>
        <div className="border border-gray-300 rounded p-4 animate-pulse">
          <h2 className="text-xl font-semibold bg-gray-300 h-6 w-2/3 rounded"></h2>
          <p className="bg-gray-300 h-4 w-2/3 rounded"></p>
          <p className="bg-gray-300 h-4 w-2/3 rounded"></p>
          <p className="bg-gray-300 h-4 w-2/3 rounded"></p>
          <p className="bg-gray-300 h-4 w-2/3 rounded"></p>
        </div>
        <div className="border border-gray-300 rounded p-4 animate-pulse">
          <h2 className="text-xl font-semibold bg-gray-300 h-6 w-2/3 rounded"></h2>
          <p className="bg-gray-300 h-4 w-2/3 rounded"></p>
          <p className="bg-gray-300 h-4 w-2/3 rounded"></p>
          <p className="bg-gray-300 h-4 w-2/3 rounded"></p>
          <p className="bg-gray-300 h-4 w-2/3 rounded"></p>
        </div>
        <div className="border border-gray-300 rounded p-4 animate-pulse">
          <h2 className="text-xl font-semibold bg-gray-300 h-6 w-2/3 rounded"></h2>
          <p className="bg-gray-300 h-4 w-2/3 rounded"></p>
          <p className="bg-gray-300 h-4 w-2/3 rounded"></p>
          <p className="bg-gray-300 h-4 w-2/3 rounded"></p>
          <p className="bg-gray-300 h-4 w-2/3 rounded"></p>
        </div>
        <div className="border border-gray-300 rounded p-4 animate-pulse">
          <h2 className="text-xl font-semibold bg-gray-300 h-6 w-2/3 rounded"></h2>
          <p className="bg-gray-300 h-4 w-2/3 rounded"></p>
          <p className="bg-gray-300 h-4 w-2/3 rounded"></p>
          <p className="bg-gray-300 h-4 w-2/3 rounded"></p>
          <p className="bg-gray-300 h-4 w-2/3 rounded"></p>
        </div>
        <div className="border border-gray-300 rounded p-4 animate-pulse">
          <h2 className="text-xl font-semibold bg-gray-300 h-6 w-2/3 rounded"></h2>
          <p className="bg-gray-300 h-4 w-2/3 rounded"></p>
          <p className="bg-gray-300 h-4 w-2/3 rounded"></p>
          <p className="bg-gray-300 h-4 w-2/3 rounded"></p>
          <p className="bg-gray-300 h-4 w-2/3 rounded"></p>
        </div>
      </div>
    </div>
  );
};

export default jobsPageSkeleton;
