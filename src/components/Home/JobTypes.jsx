import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const JobTypes = () => {
  // Define assistance types with main content and additional content
  const assistanceTypes = [
    {
      title: "Administrative Support",
      mainContent:
        "Administrative Support virtual assistants can help you with tasks such as managing emails, scheduling appointments, data entry, and document organization.",
      additionalContent:
        "Additional services may include bookkeeping, invoicing, and organizing travel arrangements.",
    },
    {
      title: "Social Media Management",
      mainContent:
        "Social Media Management virtual assistants can handle your social media accounts, create content, schedule posts, and engage with your audience.",
      additionalContent:
        "Additional services may include social media advertising and analytics reporting.",
    },
    {
      title: "Email Management",
      mainContent:
        "Email Management virtual assistants can organize your inbox, respond to emails, and filter important messages from spam.",
      additionalContent:
        "Additional services may include setting up email filters and managing email marketing campaigns.",
    },
    {
      title: "Data Entry",
      mainContent:
        "Data Entry virtual assistants can input data, update spreadsheets, and maintain databases with accuracy and efficiency.",
      additionalContent:
        "Additional services may include data cleansing and verification.",
    },
    {
      title: "Content Writing",
      mainContent:
        "Content Writing virtual assistants can create blog posts, articles, website content, and marketing materials that are engaging and SEO-friendly.",
      additionalContent:
        "Additional services may include content strategy development and keyword research.",
    },
    {
      title: "Graphic Design",
      mainContent:
        "Graphic Design virtual assistants can design logos, banners, social media graphics, and marketing materials to enhance your brand's visual identity.",
      additionalContent:
        "Additional services may include image editing and design consultations.",
    },
    {
      title: "Research and Analysis",
      mainContent:
        "Research and Analysis virtual assistants can conduct market research, data analysis, and competitor analysis to inform your business decisions.",
      additionalContent:
        "Additional services may include creating reports and presentations based on research findings.",
    },
    {
      title: "Customer Support",
      mainContent:
        "Customer Support virtual assistants can respond to customer inquiries, handle complaints, and provide exceptional customer service.",
      additionalContent:
        "Additional services may include managing customer support tickets and providing product support.",
    },
    {
      title: "Calendar Management",
      mainContent:
        "Calendar Management virtual assistants can schedule appointments, set reminders, and help you stay organized.",
      additionalContent:
        "Additional services may include arranging meetings and coordinating event logistics.",
    },
    {
      title: "Travel Arrangements",
      mainContent:
        "Travel Arrangements virtual assistants can plan and book travel, including flights, accommodations, and transportation.",
      additionalContent:
        "Additional services may include creating itineraries and ensuring a smooth travel experience.",
    },
    {
      title: "Bookkeeping and Accounting",
      mainContent:
        "Bookkeeping and Accounting virtual assistants can manage financial records, reconcile accounts, and prepare financial reports.",
      additionalContent:
        "Additional services may include tax preparation and financial analysis.",
    },
    {
      title: "Website Maintenance",
      mainContent:
        "Website Maintenance virtual assistants can update website content, perform regular backups, and ensure your website runs smoothly.",
      additionalContent:
        "Additional services may include SEO optimization and security monitoring.",
    },
    {
      title: "Project Coordination",
      mainContent:
        "Project Coordination virtual assistants can help you plan and execute projects, manage timelines, and coordinate tasks.",
      additionalContent:
        "Additional services may include project documentation and progress tracking.",
    },
    {
      title: "Event Planning",
      mainContent:
        "Event Planning virtual assistants can assist with event coordination, including venue selection, guest invitations, and logistics.",
      additionalContent:
        "Additional services may include budget management and vendor coordination.",
    },
    {
      title: "Online Research",
      mainContent:
        "Online Research virtual assistants can conduct internet research on various topics to gather information and insights.",
      additionalContent:
        "Additional services may include creating reports and summarizing research findings.",
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
                  <p className="text-gray-700">{job.additionalContent}</p>
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
