import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { AiFillPlusCircle } from "react-icons/ai";

const Skills = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [error1, setError1] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const userObjectString = localStorage.getItem("user");
  const userObject = JSON.parse(userObjectString);
  const userId = userObject._id;
  const token = userObject.token;

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
      setError(error.response ? error.response.data.message : error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  const handleSkillChange = (selectedOptions) => {
    if (selectedOptions.length <= 5) {
      setSelectedSkills(selectedOptions);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedSkills([]);
    setSuccess(false);
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.patch(
        `https://assist-api-5y59.onrender.com/api/v1/user/skills/${userId}`,
        { skills: selectedSkills },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserData({ ...userData, skills: selectedSkills });
      setLoading(false);
      setMessage("Skills updated successfully!");
      setSuccess(true);
      setSelectedSkills([]);
    } catch (error) {
      setError1(error.response ? error.response.data.message : error.message);
      setLoading(false);
      setSuccess(false);
    }
  };

  const skillsOptions = [
    { value: "Press Pitching", label: "Press Pitching" },
    { value: "Media Networking", label: "Media Networking" },
    { value: "Strategic Thinking", label: "Strategic Thinking" },
    { value: "Crisis Communication", label: "Crisis Communication" },
    { value: "Event Coordination", label: "Event Coordination" },
    { value: "Copywriting", label: "Copywriting" },
    { value: "Social Media Management", label: "Social Media Management" },
    { value: "Influencer Relations", label: "Influencer Relations" },
    {
      value: "Online Reputation Management",
      label: "Online Reputation Management",
    },
    { value: "Content Creation", label: "Content Creation" },
    { value: "SEO Optimization", label: "SEO Optimization" },
    { value: "Brand Messaging", label: "Brand Messaging" },
    { value: "Community Engagement", label: "Community Engagement" },
    { value: "Public Speaking", label: "Public Speaking" },
    { value: "Data Analytics", label: "Data Analytics" },
  ];

  return (
    <>
      {isLoading ? (
        <div className="animate-pulse bg-blue-100 rounded-md p-2 mr-4">
          <h2 className="font-semibold w-20 h-6 mb-4 bg-blue-200"></h2>
          <hr className="border-t-2 border-blue-700 mb-4" />
          <div className="w-full h-52 flex flex-col justify-between">
            <div className="pt-4">
              <p className="w-40 h-4 bg-blue-200 mb-2"></p>
              <p className="w-32 h-4 bg-blue-200 mb-2"></p>
              <p className="w-44 h-4 bg-blue-200 mb-2"></p>
            </div>
            <div className="text-red-500 my-1 py-2 px-4 text-center">
              <p className="w-24 h-4 bg-blue-200"></p>
            </div>
            <div className="grid place-items-center">
              <button className="px-4 py-2 flex justify-center space-x-2 bg-blue-200 rounded-md hover:bg-blue-700 font-semibold hover:text-white">
                <span className="grid place-items-center w-20 h-6 bg-blue-200"></span>
                <span className="grid place-items-center w-6 h-6 bg-blue-200">
                  <AiFillPlusCircle />
                </span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <main className="bg-blue-100 rounded-md p-2 mr-4">
          <h2 className="font-semibold">Skills</h2>
          <hr className="border-t-2 border-blue-700" />
          {userData && (
            <section className="w-full h-52 flex flex-col justify-between">
              <div className="pt-4">
                {userData.skills.length === 0 ? (
                  <p>You have not added any skills at the moment!</p>
                ) : (
                  <ul className="p-1">
                    {userData.skills.map((skill) => (
                      <li
                        className="cursor-pointer font-semibold text-blue-700 hover:underline"
                        key={skill._id}
                      >
                        {skill.label}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {error && (
                <div className="text-red-500 my-1 py-2 px-4 text-center">
                  <p>{error}</p>
                </div>
              )}
              <div className="grid place-items-center">
                <button
                  onClick={() => setShowModal(true)}
                  className="px-4 py-2 flex justify-center space-x-2 bg-blue-200 rounded-md hover:bg-blue-700 font-semibold hover:text-white"
                >
                  <span className="grid place-items-center">Add Skills</span>
                  <span className="grid place-items-center">
                    <AiFillPlusCircle size={20} />
                  </span>
                </button>
              </div>
            </section>
          )}

          {/* Modal */}
          {showModal && (
            <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-md w-2/3 h-1/3 flex flex-col items-center">
                <h3 className="text-lg font-semibold mb-1">Select Skills</h3>
                <p className="mb-2 py-1">You can add up to 5 skills</p>
                <form onSubmit={handleSubmit} className="w-full">
                  <Select
                    id="skillsModal"
                    name="skillsModal"
                    isMulti
                    placeholder="Select Skills"
                    value={selectedSkills}
                    onChange={handleSkillChange}
                    options={skillsOptions}
                    className="w-full mb-4 font-semibold"
                  />
                  {success ? (
                    <div className="text-center">
                      {" "}
                      <button
                        onClick={handleCloseModal}
                        className="mr-4 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                      >
                        Close
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-center w-full">
                      <button
                        onClick={handleCloseModal}
                        className="mr-4 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-200 rounded-md hover:bg-blue-300"
                      >
                        {loading ? "Please Wait" : "Save"}
                      </button>
                    </div>
                  )}
                  {error1 && (
                    <div className="text-red-600 my-1 py-2 px-4 text-center">
                      <p>{error1}</p>
                    </div>
                  )}
                  {message && (
                    <div className="text-green-600 my-1 py-2 px-4 text-center">
                      <p>{message}</p>
                    </div>
                  )}
                </form>
              </div>
            </div>
          )}
        </main>
      )}
    </>
  );
};

export default Skills;
