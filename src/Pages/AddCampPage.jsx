import { useState } from "react";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUserMd,
  FaDollarSign,
  FaFileAlt,
  FaUsers,
} from "react-icons/fa";

const AddCampPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    fees: "",
    dateTime: "",
    location: "",
    healthcareProfessional: "",
    description: "",
    participantCount: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Camp Data Submitted: ", formData);
    // Here, you can implement the logic to send the form data to the server or API
  };

  return (
    <section className="dark:bg-gray-900 text-gray-600 dark:text-gray-300 py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-semibold text-teal-600 dark:text-teal-400 text-center mb-6">
            Add A New Camp
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Camp Name */}
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 flex items-center">
                  <FaFileAlt className="mr-2 text-teal-600 dark:text-teal-400" />
                  Camp Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-600 dark:focus:ring-teal-400"
                  placeholder="Enter Camp Name"
                  required
                />
              </div>

              {/* Camp Image */}
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 flex items-center">
                  <FaFileAlt className="mr-2 text-teal-600 dark:text-teal-400" />
                  Camp Image URL
                </label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-600 dark:focus:ring-teal-400"
                  placeholder="Enter Image URL"
                  required
                />
              </div>

              {/* Camp Fees */}
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 flex items-center">
                  <FaDollarSign className="mr-2 text-teal-600 dark:text-teal-400" />
                  Camp Fees
                </label>
                <input
                  type="text"
                  name="fees"
                  value={formData.fees}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-600 dark:focus:ring-teal-400"
                  placeholder="Enter Camp Fees"
                  required
                />
              </div>

              {/* Date and Time */}
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 flex items-center">
                  <FaCalendarAlt className="mr-2 text-teal-600 dark:text-teal-400" />
                  Date & Time
                </label>
                <input
                  type="datetime-local"
                  name="dateTime"
                  value={formData.dateTime}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-600 dark:focus:ring-teal-400"
                  required
                />
              </div>

              {/* Location */}
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-teal-600 dark:text-teal-400" />
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-600 dark:focus:ring-teal-400"
                  placeholder="Enter Camp Location"
                  required
                />
              </div>

              {/* Healthcare Professional */}
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 flex items-center">
                  <FaUserMd className="mr-2 text-teal-600 dark:text-teal-400" />
                  Healthcare Professional Name
                </label>
                <input
                  type="text"
                  name="healthcareProfessional"
                  value={formData.healthcareProfessional}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-600 dark:focus:ring-teal-400"
                  placeholder="Enter Professional's Name"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 flex items-center">
                  <FaFileAlt className="mr-2 text-teal-600 dark:text-teal-400" />
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-600 dark:focus:ring-teal-400"
                  placeholder="Enter Camp Description"
                  rows="4"
                  required
                />
              </div>

              {/* Participant Count (Starts at 0) */}
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 flex items-center">
                  <FaUsers className="mr-2 text-teal-600 dark:text-teal-400" />
                  Participant Count (Starts at 0)
                </label>
                <input
                  type="number"
                  name="participantCount"
                  value={formData.participantCount}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-600 dark:focus:ring-teal-400"
                  disabled
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full sm:w-auto py-3 px-6 bg-teal-600 text-white rounded-lg hover:bg-teal-500 dark:hover:bg-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-600 transition duration-300"
              >
                Add Camp
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddCampPage;
