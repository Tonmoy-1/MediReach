/* eslint-disable react/prop-types */

import { FaTimes } from "react-icons/fa";
import { imageUpload } from "../Api/Utils";

const EditProfileModal = ({ isOpen, onClose, adminData, onUpdate }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.image.files[0];
    const image = await imageUpload(photo);
    const updateData = { name, email, image };
    onUpdate(updateData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 w-full max-w-lg rounded-lg shadow-lg p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        >
          <FaTimes className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
          Edit Profile
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="mb-4">
            <label className="block text-gray-600 dark:text-gray-300 mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              defaultValue={adminData?.name}
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-600"
              required
            />
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-gray-600 dark:text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              defaultValue={adminData?.email}
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-600"
              required
            />
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <label className="block text-gray-600 dark:text-gray-300 mb-2">
              Profile Image
            </label>
            <input
              type="file"
              accept="image/*"
              name="image"
              id="image"
              className="block w-full text-gray-600 dark:text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-teal-600 file:text-white hover:file:bg-teal-700"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
