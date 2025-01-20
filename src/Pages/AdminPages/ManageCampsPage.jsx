/* eslint-disable react/prop-types */
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Spinner from "../Spinner";

// Reusable SearchBar component
const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="mb-6 flex justify-center">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by Camp Name, Date, or Healthcare Professional"
        className="w-full max-w-lg p-3 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-800 dark:text-white"
      />
    </div>
  );
};

const ManageCampsPage = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch camps
  const {
    data: camps = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allcamps"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/all-camps`);
      return data;
    },
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const campsPerPage = 5;

  // Handle camp deletion
  const handleDelete = async (id) => {
    try {
      const confirmation = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (confirmation.isConfirmed) {
        await axiosSecure.delete(`/camp-delete/${id}`);
        refetch(); // Refetch data to update UI
        Swal.fire("Deleted!", "The camp has been deleted.", "success");
      }
    } catch (error) {
      error && toast.error("Something went wrong.");
    }
  };

  if (isLoading) return <Spinner />;

  // Filter camps based on search term
  const filteredCamps = camps.filter(
    (camp) =>
      camp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      camp.dateTime.toLowerCase().includes(searchTerm.toLowerCase()) ||
      camp.healthcareProfessional
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastCamp = currentPage * campsPerPage;
  const indexOfFirstCamp = indexOfLastCamp - campsPerPage;
  const currentCamps = filteredCamps.slice(indexOfFirstCamp, indexOfLastCamp);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="py-10 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
      <div className="mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-teal-600 dark:text-teal-400">
            Manage Camps
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">
            View, edit, and delete camps you’ve organized.
          </p>
        </header>

        {/* Search Bar */}
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-teal-500 text-white">
                <th className="px-6 py-4 font-medium text-sm">Camp Name</th>
                <th className="px-6 py-4 font-medium text-sm">Date & Time</th>
                <th className="px-6 py-4 font-medium text-sm">Location</th>
                <th className="px-6 py-4 font-medium text-sm">
                  Healthcare Professional
                </th>
                <th className="px-6 py-4 font-medium text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentCamps.map((camp) => (
                <tr
                  key={camp._id}
                  className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-300">
                    {camp.name}
                  </td>
                  <td className="px-8 py-4 text-gray-800 dark:text-gray-300">
                    {new Date(camp.dateTime).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </td>
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-300">
                    {camp.location}
                  </td>
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-300">
                    {camp.healthcareProfessional}
                  </td>
                  <td className="px-6 py-4 flex items-center space-x-4">
                    <Link to={`/dashboard/updatecamp/${camp?._id}`}>
                      <button className="text-blue-500 hover:text-blue-700 transition">
                        <FaEdit className="text-lg" />
                      </button>
                    </Link>
                    <button
                      className="text-red-500 hover:text-red-700 transition"
                      onClick={() => handleDelete(camp?._id)}
                    >
                      <FaTrash className="text-lg" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredCamps.length === 0 && (
            <p className="text-center py-6 text-gray-500 dark:text-gray-400">
              No camps found.
            </p>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6">
          {Array.from(
            { length: Math.ceil(filteredCamps.length / campsPerPage) },
            (_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`mx-1 px-4 py-2 rounded-lg ${
                  currentPage === index + 1
                    ? "bg-teal-500 text-white"
                    : "bg-gray-300 dark:bg-gray-700"
                }`}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default ManageCampsPage;
