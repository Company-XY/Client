import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { Link } from "react-router-dom";

const JobTypes = () => {
  // Define assistance types with main content and additional content
  const assistanceTypes = [
    {
      title: "Administrative Support",
      mainContent:
        "Involves tasks such as managing emails, scheduling appointments, data entry, and document organization.",
    },
    {
      title: "Social Media Management",
      mainContent:
        "Involves handling  social media accounts, creating content, scheduling posts, and engaging with audience.",
    },
    {
      title: "Email Management",
      mainContent:
        "This involves organizing inbox, responding to emails, and filtering important messages from spam.",
    },
    {
      title: "Data Entry",
      mainContent:
        "Data input, updating spreadsheets, and maintaining databases with accuracy and efficiency.",
    },
    {
      title: "Content Writing",
      mainContent:
        "Content Writing involves writing blog posts, articles, website content, and marketing materials that are engaging and SEO-friendly.",
    },
    {
      title: "Graphic Design",
      mainContent:
        "Graphic Design involves designing logos, banners, social media graphics, and marketing materials to enhance brand's visual identity.",
    },
    {
      title: "Research and Analysis",
      mainContent:
        "Research and Analysis involves market research, data analysis, and perform competitor analysis to inform business decisions.",
    },
    {
      title: "Customer Support",
      mainContent:
        "Customer Support involves responding to customer inquiries, handle complaints, and provide exceptional customer service.",
    },
    {
      title: "Calendar Management",
      mainContent:
        "This involves scheduling appointments, setting reminders, and helping stay organized.",
    },
    {
      title: "Travel Arrangements",
      mainContent:
        "This involves planning and booking travel, including flights, accommodations, and transportation.",
    },
    {
      title: "Bookkeeping and Accounting",
      mainContent:
        "Bookkeeping and Accounting involves managing financial records, reconciling accounts, and preparing financial reports.",
    },
    {
      title: "Website Maintenance",
      mainContent:
        "Website Maintenance involves date website content, perform regular backups, and ensure your website runs smoothly.",
    },
    {
      title: "Project Coordination",
      mainContent:
        "Help plan and execute projects, manage timelines, and coordinate tasks.",
    },
    {
      title: "Event Planning",
      mainContent:
        " Sould be able to assist with event coordination, including venue selection, guest invitations, and logistics.",
    },
    {
      title: "Online Research",
      mainContent:
        "Online Research virtual assistants can conduct internet research on various topics to gather information and insights.",
    },
  ];

  // State to track which job type is expanded
  const [expandedJobType, setExpandedJobType] = useState(null);

  return (
    <section className="virtual-assistance-section py-12 w-full overflow-hidden rounded-xl">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
          Types of Jobs on Our Platform
        </h2>
        <p className="text-lg md:text-xl mb-6">
          Discover the range of tasks that virtual assistants can handle to
          support you.
        </p>
        <div className="grid grid-cols-1 mt-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {assistanceTypes.map((job, index) => (
            <div
              key={index}
              className={`p-4 shadow-md rounded-md flex flex-col items-center justify-center transition transform hover:bg-blue-400 hover:scale-105 hover:shadow-xl cursor-pointer ${
                expandedJobType === index ? "bg-blue-400" : ""
              }`}
              onClick={() =>
                setExpandedJobType(expandedJobType === index ? null : index)
              }
            >
              <div className="flex items-center">
                <p
                  className={`text-gray-700 ${
                    expandedJobType === index ? "text-white" : ""
                  }`}
                >
                  {job.title}
                </p>
                <div className="ml-4">
                  {expandedJobType === index ? (
                    <FaMinus size={14} color="grey" />
                  ) : (
                    <FaPlus size={14} color="grey" />
                  )}
                </div>
              </div>
              {expandedJobType === index && (
                <div className="mt-2">
                  <p className="text-black-700 text-xs">
                    {job.mainContent} <br />
                    <Link
                      to="*"
                      className="inline-flex items-center font-medium text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-700 text-xs"
                    >
                      Read more
                      <svg
                        className="w-5 h-5 ml-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </Link>
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobTypes;
