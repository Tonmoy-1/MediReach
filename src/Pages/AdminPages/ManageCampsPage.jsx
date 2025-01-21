import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import Spinner from "../Spinner";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useState } from "react";
import SearchBar from "../../Components/SearchBar";
import Pagination from "../../Components/Pagination";
import { Link } from "react-router-dom";

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
      const { data } = await axiosSecure.get("/all-camps");
      return data;
    },
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const campsPerPage = 5;

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
        toast.success("Camp deleted successfully.");
      }
    } catch (error) {
      error && toast.error("Failed to delete camp.");
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
  const paginatedCamps = filteredCamps.slice(
    (currentPage - 1) * campsPerPage,
    currentPage * campsPerPage
  );

  return (
    <div className="min-h-screen py-10 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-teal-600 dark:text-white mb-6 text-center">
          Manage Camps
        </h1>

        {/* Search Bar Component */}
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-teal-500 text-white">
                <th className="px-6 py-4 text-left text-sm">Camp Name</th>
                <th className="px-6 py-4 text-left text-sm">Date & Time</th>
                <th className="px-6 py-4 text-left text-sm">Location</th>
                <th className="px-6 py-4 text-left text-sm">
                  Healthcare Professional
                </th>
                <th className="px-6 py-4 text-center text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCamps.length > 0 ? (
                paginatedCamps.map((camp) => (
                  <tr
                    key={camp._id}
                    className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-300">
                      {camp.name}
                    </td>
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-300">
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
                      <Link to={`/dashboard/updatecamp/${camp._id}`}>
                        <button className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-500 text-white rounded-lg">
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(camp._id)}
                        className="ml-4 px-4 py-2 text-sm bg-red-600 hover:bg-red-500 text-white rounded-lg"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-6 text-center text-gray-600 dark:text-gray-400"
                  >
                    No camps found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Component */}
        <Pagination
          totalItems={filteredCamps.length}
          itemsPerPage={campsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ManageCampsPage;
