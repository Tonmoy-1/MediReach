import { useNavigate, useParams } from "react-router-dom";
// import Swal from "sweetalert2";
import {
  FaFileAlt,
  FaDollarSign,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUserMd,
  FaUsers,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { imageUpload } from "../../Api/Utils";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Spinner from "../Spinner";

const UpdateCampPage = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const [campData, setCampData] = useState();
  const [loading, setLoading] = useState(false);
  const [updateData, setUpdateData] = useState();
  const navigate = useNavigate();

  // Fetch current camp details
  useEffect(() => {
    fetchCampDetails();
  }, [id]);

  const fetchCampDetails = async () => {
    try {
      setLoading(true);
      const { data } = await axiosSecure.get(`/camp/${id}`);
      setCampData(data);
      setLoading(false);
    } catch (error) {
      error && toast.error("something wrong");
      setLoading(false);
    }
  };

  // Submit the updated camp details
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const image = form.image.files[0];
    const photoURl = await imageUpload(image);
    const name = form.name.value;
    const fees = form.fees.value;
    const dateTime = form.dateTime.value;
    const location = form.location.value;
    const healthcareProfessional = form.healthcareProfessional.value;
    const description = form.description.value;
    const participantCount = parseInt(form.participantCount.value);
    const updatedData = {
      name,
      fees,
      dateTime,
      location,
      healthcareProfessional,
      description,
      participantCount,
      photoURl,
    };
    if (!photoURl) return toast.error("please upload a image frist");
    setUpdateData(() => ({
      ...updateData,
      photoURl: photoURl,
    }));

    try {
      // Add logic to update camp data, e.g., send it to the API

      await axiosSecure.put(`/update-camp/${campData?._id}`, updatedData);

      // On success, show a message and redirect if needed
      Swal.fire("Success", "Camp details updated successfully!", "success");
      navigate("/dashboard/manage-camps");
    } catch (error) {
      error && Swal.fire("Error", "Failed to update camp details", "error");
    }
  };

  if (loading) return <Spinner></Spinner>;

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold text-teal-600 dark:text-teal-400 mb-6">
        Update Camp Details
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
              defaultValue={campData?.name || ""}
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
              type="file"
              id="image"
              name="image"
              accept="image/*"
              className="w-full p-3 border rounded-lg text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-600 dark:focus:ring-teal-400"
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
              defaultValue={campData?.fees || ""}
              type="text"
              name="fees"
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
              defaultValue={campData?.dateTime || ""}
              type="datetime-local"
              name="dateTime"
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
              defaultValue={campData?.location || ""}
              type="text"
              name="location"
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
              defaultValue={campData?.healthcareProfessional || ""}
              type="text"
              name="healthcareProfessional"
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
              defaultValue={campData?.description || ""}
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
              value={campData?.participantCount}
              type="number"
              name="participantCount"
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
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateCampPage;
