import { useState, useEffect } from "react";
import axios from "axios";
import { AiFillPlusCircle } from "react-icons/ai";

const portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const userObjectString = localStorage.getItem("user");
  const userObject = JSON.parse(userObjectString);
  const userId = userObject._id;
  const token = userObject.token;

  const fetchUserProjects = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://assist-api-5y59.onrender.com/api/v1/user/completed/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProjects(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("An error occured");
    }
  };

  useEffect(() => {
    fetchUserProjects();
  }, [userId]);

  return (
    <>
      <main className="rounded-md">
        <h2 className="flex justify-between px-4 py-1">
          <span className="font-semibold text-center text-2xl">
            Portfolio Items ({projects.length})
          </span>
          <span>
            <button className="font-semibold p-1 bg-blue-500 rounded-md text-white">
              Manage
            </button>
          </span>
        </h2>
        <hr className="border-t-4 border-blue-700" />
        <section className="w-full h-fit flex flex-col justify-between">
          <div className="">
            {loading ? (
              <div className="animate-pulse">
                <div className="my-2 border p-4 rounded-md shadow-md">
                  <div className="font-semibold text-lg h-6 bg-gray-300 rounded mb-2"></div>
                  <div className="text-sm h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                </div>
                <div className="my-2 border p-4 rounded-md shadow-md">
                  <div className="font-semibold text-lg h-6 bg-gray-300 rounded mb-2"></div>
                  <div className="text-sm h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                </div>
                <div className="my-2 border p-4 rounded-md shadow-md">
                  <div className="font-semibold text-lg h-6 bg-gray-300 rounded mb-2"></div>
                  <div className="text-sm h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                </div>
                <div className="my-2 border p-4 rounded-md shadow-md">
                  <div className="font-semibold text-lg h-6 bg-gray-300 rounded mb-2"></div>
                  <div className="text-sm h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                </div>
              </div>
            ) : projects.length === 0 ? (
              <span>No Portfolio Items have been added!</span>
            ) : (
              <div>
                {projects.map((project) => (
                  <div
                    key={project._id}
                    className="my-2 border p-4 rounded-md shadow-md"
                  >
                    <h3 className="font-semibold text-lg">{project.title}</h3>
                    <p className="text-sm mb-2">{project.services}</p>
                    <p className="mb-2">Budget: ${project.finalPrice}</p>
                    <p className="mb-2">Review: {project.product.review}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default portfolio;
