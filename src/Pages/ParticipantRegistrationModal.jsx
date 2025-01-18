/* eslint-disable react/prop-types */

import { FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const ParticipantRegistrationModal = ({ campDetails, isOpen, onClose }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const participantName = user?.displayName;
    const participantEmail = user?.email;
    const participantAge = form.age.value;
    const participantPhone = form.phone.value;
    const participantGender = form.gender.value;

    const participantData = {
      campDetails,
      participantAge,
      participantEmail,
      participantGender,
      participantPhone,
      participantName,
      paymentStatus: "pay",
      confirmationStatus: "pending",
    };

    try {
      await axiosSecure.post(`/register-participant`, participantData);

      // increase the participant count to main camp
      await axiosSecure.patch(`/register-participant/${campDetails?._id}`, {
        participantCount: 1,
      });
      Swal.fire(
        "Success",
        "You have successfully registered for the camp!",
        "success"
      );
      onClose();
    } catch (error) {
      error &&
        Swal.fire("Error", "Something went wrong. Please try again!", "error");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-white dark:bg-gray-800 w-full max-w-5xl lg:w-3/4 rounded-lg shadow-lg overflow-hidden">
        {/* Modal Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-teal-600 dark:text-gray-100">
              Join the Camp
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Your path to a healthier tomorrow starts here!
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {/* Camp Details */}
          <div className="mb-6">
            <h3 className="text-xl text-teal-600 font-semibold  dark:text-gray-100 mb-4">
              Camp Details
            </h3>
            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              <p>
                <strong>Camp Name:</strong> {campDetails.name}
              </p>
              <p>
                <strong>Fees:</strong> ${campDetails.fees}
              </p>
              <p>
                <strong>Location:</strong> {campDetails.location}
              </p>
              <p>
                <strong>Healthcare Professional:</strong>{" "}
                {campDetails.healthcareProfessional}
              </p>
            </div>
          </div>

          {/* Participant Information */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-teal-600 dark:text-gray-100 mb-4">
              Participant Information
            </h3>
            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              <p>
                <strong>Name: </strong>
                {user?.displayName}
              </p>
              <p>
                <strong>Email: </strong>
                {user?.email}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              {/* Age */}
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  required
                  className="w-full p-3 border rounded-lg text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-600 dark:focus:ring-teal-400"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  className="w-full p-3 border rounded-lg text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-600 dark:focus:ring-teal-400"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                  Gender
                </label>
                <select
                  name="gender"
                  required
                  className="w-full p-3 border rounded-lg text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-600 dark:focus:ring-teal-400"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Emergency Contact */}
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                  Emergency Contact
                </label>
                <input
                  type="tel"
                  name="emergencyContact"
                  required
                  className="w-full p-3 border rounded-lg text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-600 dark:focus:ring-teal-400"
                />
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="py-3 px-6 bg-teal-600 text-white rounded-lg hover:bg-teal-500 dark:hover:bg-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-600 dark:focus:ring-teal-400 transition duration-300"
                >
                  Join Camp
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticipantRegistrationModal;
