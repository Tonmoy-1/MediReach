import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUserMd,
  FaDollarSign,
  FaUsers,
} from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Fake JSON data for camps
// const campsData = [
//   {
//     id: 1,
//     name: "Heart Health Camp",
//     image: "https://i.ibb.co.com/2YYVqfM/img1.jpg",
//     fees: "$50",
//     dateTime: "2025-02-15 10:00 AM",
//     location: "City Hospital, Downtown",
//     healthcareProfessional: "Dr. John Doe",
//     participantCount: 150,
//   },
//   {
//     id: 2,
//     name: "Dental Care Camp",
//     image: "https://i.ibb.co.com/2YYVqfM/img1.jpg",
//     fees: "$30",
//     dateTime: "2025-03-01 09:00 AM",
//     location: "Main Street Clinic",
//     healthcareProfessional: "Dr. Jane Smith",
//     participantCount: 120,
//   },
//   {
//     id: 3,
//     name: "Eye Care Camp",
//     image: "https://i.ibb.co.com/2YYVqfM/img1.jpg",
//     fees: "$40",
//     dateTime: "2025-03-10 11:00 AM",
//     location: "Vision Center, Health Plaza",
//     healthcareProfessional: "Dr. William Brown",
//     participantCount: 200,
//   },
//   {
//     id: 4,
//     name: "Mental Health Awareness Camp",
//     image: "https://i.ibb.co.com/2YYVqfM/img1.jpg",
//     fees: "$60",
//     dateTime: "2025-04-05 01:00 PM",
//     location: "Mental Wellness Center",
//     healthcareProfessional: "Dr. Emily Davis",
//     participantCount: 90,
//   },
//   {
//     id: 5,
//     name: "Child Vaccination Camp",
//     image: "https://i.ibb.co.com/2YYVqfM/img1.jpg",
//     fees: "$20",
//     dateTime: "2025-04-12 08:00 AM",
//     location: "Community Health Center",
//     healthcareProfessional: "Dr. Sarah White",
//     participantCount: 180,
//   },
//   {
//     id: 6,
//     name: "General Health Screening",
//     image: "https://i.ibb.co.com/2YYVqfM/img1.jpg",
//     fees: "$25",
//     dateTime: "2025-05-02 10:00 AM",
//     location: "City Wellness Center",
//     healthcareProfessional: "Dr. Michael Green",
//     participantCount: 75,
//   },
// ];

const PopularCampsSection = () => {
  const { data: campsData, isLoading } = useQuery({
    queryKey: ["allcamps"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/all-camps`
      );
      return data;
    },
  });
  console.log(campsData);
  if (isLoading) return <p>Loding.........</p>;
  return (
    <section className="bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300 py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-center text-teal-600 dark:text-teal-400 mb-8">
          Popular Medical Camps
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campsData.slice(0, 6).map((camp) => (
            <div
              key={camp._id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={camp?.photoURl}
                alt={camp?.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-teal-600 dark:text-teal-400 mb-2">
                  {camp?.name}
                </h3>

                {/* Healthcare Professional */}
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <FaUserMd className="mr-2 text-teal-600 dark:text-teal-400" />
                  <span>{camp?.healthcareProfessional}</span>
                </div>

                {/* Date & Time */}
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <FaCalendarAlt className="mr-2 text-teal-600 dark:text-teal-400" />
                  <span>{`${camp.dateTime.split("T")[0]} at ${
                    camp.dateTime.split("T")[1]
                  } PM`}</span>
                </div>

                {/* Location */}
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <FaMapMarkerAlt className="mr-2 text-teal-600 dark:text-teal-400" />
                  <span>{camp.location}</span>
                </div>

                {/* Camp Fees */}
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <FaDollarSign className="mr-2 text-teal-600 dark:text-teal-400" />
                  <span>{camp.fees}</span>
                </div>

                {/* Participant Count */}
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <FaUsers className="mr-2 text-teal-600 dark:text-teal-400" />
                  <span>{camp.participantCount} participants</span>
                </div>

                <Link
                  to={`/camp-details/1`} // need to dynamic
                  className="text-teal-600 dark:text-teal-400 hover:text-teal-500 dark:hover:text-teal-300 transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* See All Camps Button */}
        <div className="mt-8 text-center">
          <Link
            to="/available-camps"
            className="px-6 py-3 text-white bg-teal-600 rounded-lg hover:bg-teal-500 dark:hover:bg-teal-400 transition duration-300"
          >
            See All Camps
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularCampsSection;
