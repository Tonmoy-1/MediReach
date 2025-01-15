import axios from "axios";
import { useForm } from "react-hook-form";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUserMd,
  FaDollarSign,
  FaFileAlt,
  FaUsers,
} from "react-icons/fa";
import { imageUpload } from "../Api/Utils";
import toast from "react-hot-toast";

const AddCampPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = async (data) => {
    const { image, ...rest } = data;

    if (!image[0]) {
      toast.error("Please upload a camp image.");
      return;
    }

    try {
      // Upload image and get URL
      const photoURl = await imageUpload(image[0]);
      const participantCount = 0;
      const campData = { ...rest, photoURl, participantCount };

      // Send camp data to the server
      const { data: response } = await axios.post(
        `${import.meta.env.VITE_API_URL}/add-camp-post`,
        campData
      );
      toast.success("Camp Data Added Successfully");
      setValue("name", "");
      setValue("fees", "");
      setValue("dateTime", "");
      setValue("location", "");
      setValue("healthcareProfessional", "");
      setValue("description", "");
      setValue("", 0);
      setValue("image", null);
      console.log(response);
    } catch (error) {
      error && toast.error("Failed to add camp data.");
    }
  };

  return (
    <section className="dark:bg-gray-900 text-gray-600 dark:text-gray-300 py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-semibold text-teal-600 dark:text-teal-400 text-center mb-6">
            Add A New Camp
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Camp Name */}
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 flex items-center">
                  <FaFileAlt className="mr-2 text-teal-600 dark:text-teal-400" />
                  Camp Name
                </label>
                <input
                  type="text"
                  {...register("name", { required: "Camp Name is required" })}
                  className="w-full p-3 border rounded-lg text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-600 dark:focus:ring-teal-400"
                  placeholder="Enter Camp Name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              {/* Camp Image */}
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 flex items-center">
                  <FaFileAlt className="mr-2 text-teal-600 dark:text-teal-400" />
                  Camp Image
                </label>
                <input
                  type="file"
                  {...register("image", { required: "Camp Image is required" })}
                  accept="image/*"
                  className="w-full p-3 border rounded-lg text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-600 dark:focus:ring-teal-400"
                />
                {errors.image && (
                  <p className="text-red-500 text-sm">{errors.image.message}</p>
                )}
              </div>

              {/* Camp Fees */}
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 flex items-center">
                  <FaDollarSign className="mr-2 text-teal-600 dark:text-teal-400" />
                  Camp Fees
                </label>
                <input
                  type="text"
                  {...register("fees", { required: "Camp Fees is required" })}
                  className="w-full p-3 border rounded-lg text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-600 dark:focus:ring-teal-400"
                  placeholder="Enter Camp Fees"
                />
                {errors.fees && (
                  <p className="text-red-500 text-sm">{errors.fees.message}</p>
                )}
              </div>

              {/* Date and Time */}
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 flex items-center">
                  <FaCalendarAlt className="mr-2 text-teal-600 dark:text-teal-400" />
                  Date & Time
                </label>
                <input
                  type="datetime-local"
                  {...register("dateTime", {
                    required: "Date & Time is required",
                  })}
                  className="w-full p-3 border rounded-lg text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-600 dark:focus:ring-teal-400"
                />
                {errors.dateTime && (
                  <p className="text-red-500 text-sm">
                    {errors.dateTime.message}
                  </p>
                )}
              </div>

              {/* Location */}
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-teal-600 dark:text-teal-400" />
                  Location
                </label>
                <input
                  type="text"
                  {...register("location", {
                    required: "Location is required",
                  })}
                  className="w-full p-3 border rounded-lg text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-600 dark:focus:ring-teal-400"
                  placeholder="Enter Camp Location"
                />
                {errors.location && (
                  <p className="text-red-500 text-sm">
                    {errors.location.message}
                  </p>
                )}
              </div>

              {/* Healthcare Professional */}
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 flex items-center">
                  <FaUserMd className="mr-2 text-teal-600 dark:text-teal-400" />
                  Healthcare Professional Name
                </label>
                <input
                  type="text"
                  {...register("healthcareProfessional", {
                    required: "Healthcare Professional Name is required",
                  })}
                  className="w-full p-3 border rounded-lg text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-600 dark:focus:ring-teal-400"
                  placeholder="Enter Professional's Name"
                />
                {errors.healthcareProfessional && (
                  <p className="text-red-500 text-sm">
                    {errors.healthcareProfessional.message}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 flex items-center">
                  <FaFileAlt className="mr-2 text-teal-600 dark:text-teal-400" />
                  Description
                </label>
                <textarea
                  {...register("description", {
                    required: "Description is required",
                  })}
                  className="w-full p-3 border rounded-lg text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-600 dark:focus:ring-teal-400"
                  placeholder="Enter Camp Description"
                  rows="4"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Participant Count */}
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 flex items-center">
                  <FaUsers className="mr-2 text-teal-600 dark:text-teal-400" />
                  Participant Count (Starts at 0)
                </label>
                <input
                  value={0}
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
