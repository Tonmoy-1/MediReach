import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUserMd,
  FaDollarSign,
  FaUsers,
} from "react-icons/fa";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ParticipantRegistrationModal from "./ParticipantRegistrationModal";

const CampDetailPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const { id } = useParams();
  const {
    data: camp,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["camp", id],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/camp/${id}`
      );
      return data;
    },
  });
  refetch();
  if (isLoading) return <p>Loading.........</p>;

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
              src={camp.photoURl}
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
              <span>{`${camp.dateTime.split("T")[0]} at ${
                camp.dateTime.split("T")[1]
              } PM`}</span>
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
              <span>{camp.participantCount} participants</span>
            </div>

            {/* Join Camp Button */}
            <div className="flex gap-3 items-center">
              <button
                onClick={() => setModalOpen(true)}
                className="py-3 px-4 bg-teal-600 text-white rounded-lg hover:bg-teal-500 dark:hover:bg-teal-400 transition duration-300"
              >
                Join Camp
              </button>
              {/* Back Button */}
              <button>
                <Link
                  to="/available-camps"
                  className="py-3 px-4 bg-teal-600 text-white rounded-lg hover:bg-teal-500 dark:hover:bg-teal-400 transition duration-300"
                >
                  Back to All Camps
                </Link>
              </button>
              <ParticipantRegistrationModal
                campDetails={camp}
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CampDetailPage;
