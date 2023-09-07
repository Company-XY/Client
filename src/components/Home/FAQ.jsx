import { useState } from "react";

const FAQ = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const handleAccordionClick = (index) => {
    if (activeAccordion === index) {
      setActiveAccordion(null);
    } else {
      setActiveAccordion(index);
    }
  };

  const faqData = [
    {
      question: "Can I get a virtual assistant task without rating?",
      answer:
        "Yes, you just need to sign up and complete the onboarding process.",
    },
    {
      question: "How do you make sure I get the right profile for my job?",
      answer:
        "You just need to check the profiles and match with the right one.",
    },
    {
      question: "How do you handle payment for freelancers?",
      answer: "Your satisfaction is our priority...",
    },
    {
      question: "What about client support?",
      answer: "Our dedicated support team is here to assist you...",
    },
  ];

  return (
    <section id="FAQ" className="bg-white dark:bg-gray-900">
      <div className="max-w-screen-xl px-4 pb-8 mx-auto lg:pb-24 lg:px-6 ">
        <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-center text-gray-900 lg:mb-8 lg:text-3xl dark:text-white">
          Frequently asked questions
        </h2>
        <div className="max-w-screen-md mx-auto">
          {faqData.map((item, index) => (
            <div key={index}>
              <h3>
                <button
                  type="button"
                  className="flex items-center justify-between w-full py-5 font-medium text-left text-gray-900 bg-white border-b border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                  onClick={() => handleAccordionClick(index)}
                >
                  <span>{item.question}</span>
                  <svg
                    data-accordion-icon=""
                    className={`w-6 h-6 ${
                      activeAccordion === index ? "rotate-180" : ""
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </h3>
              <div
                className={`${activeAccordion === index ? "block" : "hidden"}`}
              >
                <div
                  id={`accordion-flush-body-${index}`}
                  aria-labelledby={`accordion-flush-heading-${index}`}
                >
                  <div className="py-5 border-b border-gray-200 dark:border-gray-700">
                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
