import { FaUserEdit } from "react-icons/fa";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import EditProfileModal from "../EditProfileModal";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import Spinner from "../Spinner";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const AdminProfile = () => {
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user } = useAuth();

  const {
    data: adminData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/user-data/${user?.email}`);
      return data;
    },
  });

  if (isLoading) return <Spinner />;

  const handleUpdate = async (updatedData) => {
    try {
      await axiosSecure.put(`/update-profile/${user?.email}`, updatedData);
      refetch();
      Swal.fire("Success", "Profile updated successfully!", "success");
    } catch (error) {
      error && toast.error(error);
    }
  };

  return (
    <div className="dark:bg-gray-900 min-h-screen flex flex-col items-center justify-center py-6 px-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-2xl">
        {/* Header Section */}
        <div className="flex items-center mb-6">
          <FaUserEdit className="text-teal-600 dark:text-teal-400 w-10 h-10 mr-4" />
          <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">
            Admin Profile
          </h1>
        </div>

        {/* Profile Image Section */}
        <div className="flex justify-center mb-6">
          <img
            src={adminData?.image}
            alt="Admin Profile"
            className="w-40 h-40 rounded-full object-cover border-4 border-teal-600 shadow-md"
          />
        </div>

        {/* Profile Information */}
        <div className="space-y-6">
          <div>
            <label className="block text-gray-600 dark:text-gray-300 font-medium">
              Name
            </label>
            <p className="mt-1 text-lg text-gray-600 dark:text-gray-300">
              {adminData.name}
            </p>
          </div>

          <div>
            <label className="block text-gray-600 dark:text-gray-300 font-medium">
              Email
            </label>
            <p className="mt-1 text-lg text-gray-600 dark:text-gray-300">
              {adminData.email}
            </p>
          </div>

          <div>
            <label className="block text-gray-600 dark:text-gray-300 font-medium">
              Role
            </label>
            <p className="mt-1 text-lg text-gray-600 dark:text-gray-300">
              {adminData.role}
            </p>
          </div>
        </div>

        {/* Edit Profile Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Edit Profile
          </button>
        </div>

        <EditProfileModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          adminData={adminData}
          onUpdate={handleUpdate}
        />
      </div>
    </div>
  );
};

export default AdminProfile;
