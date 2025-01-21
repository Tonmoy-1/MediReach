import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import Spinner from "../Spinner";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useState } from "react";
import SearchBar from "../../Components/SearchBar";
import Pagination from "../../Components/Pagination";

const ManageRegisteredCamps = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: registerData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["registerData"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/registerCamps`);
      return data;
    },
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleCancel = async (campId) => {
    try {
      // Cancel registration for the specific camp
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
        refetch();
        toast.success("Registration canceled successfully.");
      }
    } catch (error) {
      error && toast.error("Failed to cancel registration.");
    }
  };

  const handlePending = async (id) => {
    try {
      await axiosSecure.patch(`/pending-status/${id}`);
      toast.success("You Successfully Update Confirm");
      refetch();
    } catch (error) {
      error && toast.error("Something Went Wrong");
    }
  };

  if (isLoading) return <Spinner />;

  // Filter camps based on search term
  const filteredCamps = registerData.filter(
    (camp) =>
      camp?.campDetails?.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      camp?.participantName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const paginatedCamps = filteredCamps.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen py-10 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-teal-600 dark:text-white mb-6 text-center">
          Manage Registered Camps
        </h1>

        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <div className="overflow-x-auto bg-white dark:bg-gray-800  rounded-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-300">
                  Camp Name
                </th>
                <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-300">
                  Camp Fees
                </th>
                <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-300">
                  Participant Name
                </th>
                <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-300">
                  Payment Status
                </th>
                <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-300">
                  Confirmation Status
                </th>
                <th className="px-4 py-2 text-center text-gray-800 dark:text-gray-300">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedCamps.length > 0 ? (
                paginatedCamps.map((camp) => (
                  <tr
                    key={camp._id}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <td className="px-4 py-2 text-gray-800 dark:text-gray-200">
                      {camp?.campDetails?.name}
                    </td>
                    <td className="px-4 py-2 text-gray-800 dark:text-gray-200">
                      ${camp?.campDetails?.fees}
                    </td>
                    <td className="px-4 py-2 text-gray-800 dark:text-gray-200">
                      {camp.participantName}
                    </td>
                    <td
                      className={`px-4 font-bold py-2 ${
                        camp.paymentStatus === "pay"
                          ? "text-red-600"
                          : "text-green-600"
                      } `}
                    >
                      {camp.paymentStatus === "pay" ? "Unpaid" : "Paid"}
                    </td>
                    <td className="px-4 py-2 text-gray-800 dark:text-gray-200">
                      <button
                        disabled={camp.confirmationStatus === "Confirm"}
                        onClick={() => handlePending(camp?._id)}
                        className="px-2 py-2 text-sm bg-teal-600 rounded-lg text-white dark:text-white disabled:cursor-not-allowed disabled:bg-gray-400"
                      >
                        {camp.confirmationStatus}
                      </button>
                    </td>
                    <td className="px-4 py-2 text-center">
                      <button
                        disabled={camp.paymentStatus === "Paid"}
                        onClick={() => handleCancel(camp._id)}
                        className="px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-500 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-4 py-6 text-center text-gray-600 dark:text-gray-400"
                  >
                    No registered camps found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          totalItems={filteredCamps.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ManageRegisteredCamps;
