import { useState } from "react";
import PropTypes from "prop-types";
import { FaSearch, FaThLarge, FaThList } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Spinner from "./Spinner";

const AvailableCampsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortCriteria, setSortCriteria] = useState("");
  const [layout, setLayout] = useState("grid");

  const { data: camps, isLoading } = useQuery({
    queryKey: ["allcamps"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/all-camps`
      );
      return data;
    },
  });
  if (isLoading) return <Spinner></Spinner>;

  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handleSortChange = (e) => setSortCriteria(e.target.value);
  const handleLayoutToggle = () => {
    setLayout((prev) => (prev === "grid" ? "list" : "grid"));
  };

  const filteredCamps = camps
    .filter((camp) =>
      camp.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortCriteria === "mostRegistered")
        return b.participantCount - a.participantCount;
      if (sortCriteria === "campFees") return a.fees - b.fees;
      if (sortCriteria === "alphabetical") return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <section className="py-10 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
      <div className="container mx-auto px-4">
        {/* Page Heading and Slogan */}
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-teal-600 dark:text-teal-400">
            Available Camps
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">
            Discover and join camps that match your passion for health and care.
          </p>
        </header>

        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          {/* Search Bar */}
          <div className="relative w-full sm:w-1/2 lg:w-1/3 mb-4 sm:mb-0">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              className="w-full p-3 border rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Search for camps..."
            />
            <FaSearch className="absolute top-1/2 transform -translate-y-1/2 right-4 text-gray-500 dark:text-gray-400" />
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortCriteria}
            onChange={handleSortChange}
            className="p-3 border rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="">Sort by...</option>
            <option value="mostRegistered">Most Registered</option>
            <option value="campFees">Camp Fees</option>
            <option value="alphabetical">Alphabetical Order</option>
          </select>

          {/* Layout Toggle */}
          <button
            onClick={handleLayoutToggle}
            className="ml-4 flex items-center p-3 border rounded-lg bg-teal-500 text-white hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            {layout === "grid" ? (
              <>
                <FaThList className="mr-2" /> Switch to Two-Column
              </>
            ) : (
              <>
                <FaThLarge className="mr-2" /> Switch to Three-Column
              </>
            )}
          </button>
        </div>

        {/* Camp Cards */}
        <div
          className={`grid ${
            layout === "grid"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1 md:grid-cols-2"
          } gap-6`}
        >
          {filteredCamps.map((camp) => (
            <div
              key={camp.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col"
            >
              <img
                src={camp?.photoURl}
                alt={camp.name}
                className="w-full h-56 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold text-teal-600 dark:text-teal-400 mb-2">
                {camp.name}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                <strong>Date & Time: </strong>
                <span>
                  {camp.dateTime
                    ? new Date(camp.dateTime).toLocaleString("en-US", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })
                    : "Date and time not available"}
                </span>
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                <strong>Location:</strong> {camp.location}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                <strong>Healthcare Professional:</strong>{" "}
                {camp.healthcareProfessional}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                <strong>Participants:</strong> {camp.participantCount}
              </p>
              {/* <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                <strong>Fees:</strong> ${camp.fees}
              </p> */}
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                {camp.description.slice(0, 100)}
              </p>
              <a
                href={`/camp/${camp._id}`}
                className="mt-auto text-center py-2 px-4 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition duration-300"
              >
                Details
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

AvailableCampsPage.propTypes = {
  camps: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      dateTime: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      healthcareProfessional: PropTypes.string.isRequired,
      participantCount: PropTypes.number.isRequired,
      fees: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default AvailableCampsPage;
