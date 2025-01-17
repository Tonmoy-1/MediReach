import { FaUserEdit } from "react-icons/fa";
import { AiOutlineCamera } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";

const UserProfile = () => {
  const { user } = useContext(AuthContext);

  const { data: userData, isLoading } = useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/user-data/${user?.email}`
      );
      return data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error loading user data</div>;

  return (
    <div className="dark:bg-gray-900 min-h-screen flex flex-col items-center justify-center py-6 px-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-xl">
        {/* Header Section */}
        <div className="flex items-center mb-6">
          <FaUserEdit className="text-teal-600 dark:text-teal-400 w-8 h-8 mr-4" />
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            User Profile
          </h1>
        </div>

        {/* Profile Image Section */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <img
              src={userData.image}
              alt="Admin Profile"
              className="w-32 h-32 rounded-full border-4 border-teal-600"
            />
            <label
              htmlFor="image-upload"
              className="absolute bottom-0 right-0 bg-teal-600 text-white rounded-full p-2 cursor-pointer"
            >
              <AiOutlineCamera className="w-5 h-5" />
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
            />
          </div>
        </div>

        {/* Profile Form */}
        <div>
          <div className="mb-4">
            <label className="block text-gray-600 dark:text-gray-300">
              Name
            </label>
            <p className="mt-1 text-gray-600 dark:text-gray-300">
              {userData.name}
            </p>
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 dark:text-gray-300">
              Email
            </label>
            <p className="mt-1 text-gray-600 dark:text-gray-300">
              {userData.email}
            </p>
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 dark:text-gray-300">
              Role
            </label>
            <p className="mt-1 text-gray-600 dark:text-gray-300">
              {userData.role}
            </p>
          </div>
        </div>

        {/* Edit Profile Button */}
        <div className="flex justify-center mt-6">
          <button className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
