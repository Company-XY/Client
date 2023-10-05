// Consultations.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";

const Consultations = () => {
  const [consultations, setConsultations] = useState([]);
  const [visibleConsultations, setVisibleConsultations] = useState(10);

  useEffect(() => {
    axios
      .get("http://assist-api-okgk.onrender.com/api/v1/consultations")
      .then((response) => {
        setConsultations(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const formatTimeAgo = (createdAt) => {
    const currentTime = new Date();
    const jobTime = new Date(createdAt);

    const timeDifference = currentTime - jobTime;

    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    const week = 7 * day;
    const month = 30 * day;
    const year = 365 * day;

    if (timeDifference < minute) {
      return "1 second ago";
    } else if (timeDifference < hour) {
      const minutes = Math.floor(timeDifference / minute);
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    } else if (timeDifference < day) {
      const hours = Math.floor(timeDifference / hour);
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    } else if (timeDifference < week) {
      const days = Math.floor(timeDifference / day);
      return `${days} ${days === 1 ? "day" : "days"} ago`;
    } else if (timeDifference < month) {
      const weeks = Math.floor(timeDifference / week);
      return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
    } else if (timeDifference < year) {
      const months = Math.floor(timeDifference / month);
      return `${months} ${months === 1 ? "month" : "months"} ago`;
    } else {
      const years = Math.floor(timeDifference / year);
      return `${years} ${years === 1 ? "year" : "years"} ago`;
    }
  };

  return (
    <div className="grid grid-cols-1 gap-2">
      {consultations.slice(0, visibleConsultations).map((consultation) => (
        <div
          className="bg-blue-100 p-4 mb-2 border border-blue-400 rounded-lg shadow-md"
          key={consultation._id}
        >
          <div className="flex justify-between">
            <h3 className="text-xl font-semibold">
              {consultation.businessName}
            </h3>
            <span className="text-gray-700">
              {formatTimeAgo(consultation.createdAt)}
            </span>
          </div>
          <div className="flex justify-start gap-4 items-center">
            <span className="text-blue-600 hover:underline">
              Budget: {consultation.budget || "Not specified"}
            </span>
            <span className="text-blue-600 hover:underline">
              Time: {consultation.time}
            </span>
          </div>
          <p className="text-gray-600 my-2">{consultation.prGoals}</p>
          <div className="mt-4">
            <p className="text-gray-700">
              Status: {consultation.status.join(", ")}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Consultations;
