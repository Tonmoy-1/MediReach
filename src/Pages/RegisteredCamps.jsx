import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { useState } from "react";
import PaymentModal from "./PaymentModal";
import Spinner from "./Spinner";
import useAxiosSecure from "../Hooks/useAxiosSecure";

import SearchBar from "../Components/SearchBar";
import Pagination from "../Components/Pagination";

const RegisteredCamps = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // State to handle modal visibility
  const [isModalOpen, setModalOpen] = useState(false);

  // State to track search term
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Fetching registered camps from API using react-query
  const {
    data: registeredCamps = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["registeredCamps"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/registerCamps/${user?.email}`);
      return data;
    },
  });

  // Function to handle camp cancellation
  const handleCancel = async (campId) => {
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
        await axiosSecure.delete(`/registered-camps/${campId}`);
        refetch(); // Refresh data after deletion
        toast.success("Registration canceled successfully.");
      }
    } catch (error) {
      error && toast.error("Failed to cancel registration.");
    }
  };

  // Filtering camps based on the search term
  const filteredCamps = registeredCamps.filter(
    (camp) =>
      camp?.campDetails?.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      camp.participantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      camp.paymentStatus.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginating filtered camps based on the current page
  const paginatedCamps = filteredCamps.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Show loading spinner while data is being fetched
  if (isLoading) return <Spinner />;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-5">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-5">
          Registered Camps
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 mb-4">
          Empowering communities through healthcare!
        </p>

        {/* Search Bar Component */}
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-left">
                <th className="px-6 py-3 text-sm font-medium">Camp Name</th>
                <th className="px-6 py-3 text-sm font-medium">Camp Fees</th>
                <th className="px-6 py-3 text-sm font-medium">
                  Participant Name
                </th>
                <th className="px-6 py-3 text-sm font-medium">
                  Payment Status
                </th>
                <th className="px-6 py-3 text-sm font-medium">Confirmation</th>
                <th className="px-6 py-3 text-sm font-medium">Actions</th>
                <th className="px-6 py-3 text-sm font-medium">Cancel</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCamps.map((camp, index) => (
                <tr
                  key={camp._id}
                  className={`${
                    index % 2 === 0
                      ? "bg-gray-100 dark:bg-gray-700"
                      : "bg-white dark:bg-gray-800"
                  } border-b border-gray-300 dark:border-gray-700`}
                >
                  <td className="px-4 py-3 text-sm font-medium text-gray-800 dark:text-gray-300">
                    {camp?.campDetails?.name}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-800 dark:text-gray-300">
                    $ {camp?.campDetails?.fees}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-800 dark:text-gray-300">
                    {camp.participantName}
                  </td>
                  <td className="px-6 py-3 text-sm">
                    <button
                      onClick={() => setModalOpen(true)}
                      className={`px-4 py-2 rounded-lg text-xs font-semibold ${
                        camp.paymentStatus === "Paid"
                          ? "bg-gray-400 text-black cursor-not-allowed"
                          : "bg-green-600 text-white"
                      }`}
                    >
                      {camp.paymentStatus}
                    </button>
                  </td>
                  <td className="px-6 py-3 text-xs">
                    <span
                      className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                        camp.confirmationStatus === "Confirm"
                          ? "bg-green-600 text-white"
                          : "bg-yellow-300 text-yellow-800"
                      }`}
                    >
                      {camp.confirmationStatus}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-sm">
                    <Link to={"/dashboard/send-feedback"}>
                      <button
                        disabled={camp.paymentStatus === "pay"}
                        className="px-4 py-2 bg-teal-500 text-white rounded-lg text-xs font-medium hover:bg-teal-400 disabled:bg-gray-400 disabled:cursor-not-allowed"
                      >
                        Feedback
                      </button>
                    </Link>
                  </td>
                  <td className="px-6 py-3 text-sm">
                    <button
                      disabled={camp.paymentStatus === "Paid"}
                      onClick={() => handleCancel(camp._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg text-xs font-medium hover:bg-red-400 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      Cancel
                    </button>
                  </td>
                  <PaymentModal
                    isOpen={isModalOpen}
                    camp={camp}
                    refetch={refetch}
                    setModalOpen={setModalOpen}
                    fees={camp?.campDetails?.fees}
                    onClose={() => setModalOpen(false)}
                  />
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Component */}
          <Pagination
            totalItems={filteredCamps.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default RegisteredCamps;
