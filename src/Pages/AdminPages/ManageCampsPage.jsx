import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ManageCampsPage = () => {
  // Fetch camps
  const {
    data: camps,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allcamps"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/all-camps`
      );
      return data;
    },
  });

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
        await axios.delete(`${import.meta.env.VITE_API_URL}/camp-delete/${id}`);
        refetch(); // Refetch data to update UI
        Swal.fire("Deleted!", "The camp has been deleted.", "success");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  if (isLoading) return <p>Loading camps...</p>;

  return (
    <section className="py-10 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
      <div className=" mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-teal-600 dark:text-teal-400">
            Manage Camps
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">
            View, edit, and delete camps you’ve organized.
          </p>
        </header>

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
              {camps.map((camp) => (
                <tr
                  key={camp._id}
                  className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-300">
                    {camp.name}
                  </td>
                  <td className="px-4 py-4 text-gray-800 dark:text-gray-300">
                    {` ${camp.dateTime.split("T")[0]} at ${
                      camp.dateTime.split("T")[1]
                    } PM`}
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
          {camps.length === 0 && (
            <p className="text-center py-6 text-gray-500 dark:text-gray-400">
              No camps found. Start by creating a new one.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ManageCampsPage;
