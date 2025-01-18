import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUserMd,
  FaDollarSign,
  FaUsers,
} from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../Pages/Spinner";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const PopularCampsSection = () => {
  const axiosSecure = useAxiosSecure();
  const { data: campsData, isLoading } = useQuery({
    queryKey: ["allcamps"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/all-camps`);
      return data;
    },
  });

  if (isLoading) return <Spinner></Spinner>;
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
                  <span>
                    {camp.dateTime
                      ? new Date(camp.dateTime).toLocaleString("en-US", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })
                      : "Date and time not available"}
                  </span>
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
                  <span>{camp?.participantCount} participants</span>
                </div>

                <Link
                  to={`/camp/${camp._id}`} // need to dynamic
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
