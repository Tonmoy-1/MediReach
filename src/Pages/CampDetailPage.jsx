import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUserMd,
  FaDollarSign,
  FaUsers,
} from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";

// Fake JSON data for camps (replace with actual data or API call)
const campsData = [
  {
    id: 1,
    name: "Heart Health Camp",
    image: "https://i.ibb.co.com/2YYVqfM/img1.jpg",
    fees: "$50",
    dateTime: "2025-02-15 10:00 AM",
    location: "City Hospital, Downtown",
    healthcareProfessional: "Dr. John Doe",
    participantCount: 150,
    description:
      "This camp focuses on heart health awareness, screenings, and providing heart health consultation by experienced doctors.",
  },
  {
    id: 2,
    name: "Dental Care Camp",
    image: "https://via.placeholder.com/800x400",
    fees: "$30",
    dateTime: "2025-03-01 09:00 AM",
    location: "Main Street Clinic",
    healthcareProfessional: "Dr. Jane Smith",
    participantCount: 120,
    description:
      "A free dental care camp with routine checkups, cleaning, and other dental services.",
  },
  // Add more camps data...
];

const CampDetailPage = () => {
  const camp = campsData.find((camp) => camp.id === parseInt(1)); // Find the camp by ID

  const [participants, setParticipants] = useState(camp.participantCount);

  const handleJoinCamp = () => {
    // Increment participant count when a user joins the camp
    setParticipants(participants + 1);
  };

  if (!camp) {
    return <div className="text-center text-red-600">Camp not found</div>; // Show error if camp is not found
  }

  return (
    <section className="dark:bg-gray-900 text-gray-600 dark:text-gray-300 py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column: Camp Image */}
          <div className="w-full">
            <img
              src={camp.image}
              alt={camp.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Right Column: Camp Details */}
          <div className="p-6">
            <h1 className="text-3xl font-semibold text-teal-600 dark:text-teal-400 mb-4">
              {camp.name}
            </h1>

            {/* Camp Description */}
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
              {camp.description}
            </p>

            {/* Healthcare Professional */}
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
              <FaUserMd className="mr-2 text-teal-600 dark:text-teal-400" />
              <span>{camp.healthcareProfessional}</span>
            </div>

            {/* Date & Time */}
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
              <FaCalendarAlt className="mr-2 text-teal-600 dark:text-teal-400" />
              <span>{camp.dateTime}</span>
            </div>

            {/* Location */}
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
              <FaMapMarkerAlt className="mr-2 text-teal-600 dark:text-teal-400" />
              <span>{camp.location}</span>
            </div>

            {/* Camp Fees */}
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
              <FaDollarSign className="mr-2 text-teal-600 dark:text-teal-400" />
              <span>{camp.fees}</span>
            </div>

            {/* Participant Count */}
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
              <FaUsers className="mr-2 text-teal-600 dark:text-teal-400" />
              <span>{participants} participants</span>
            </div>

            {/* Join Camp Button */}
            <div className="flex gap-3 items-center">
              <button
                onClick={handleJoinCamp}
                className="py-3 px-4 bg-teal-600 text-white rounded-lg hover:bg-teal-500 dark:hover:bg-teal-400 transition duration-300"
              >
                Join Camp
              </button>
              {/* Back Button */}
              <button>
                <Link
                  to="/all-camps"
                  className="py-3 px-4 bg-teal-600 text-white rounded-lg hover:bg-teal-500 dark:hover:bg-teal-400 transition duration-300"
                >
                  Back to All Camps
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CampDetailPage;
