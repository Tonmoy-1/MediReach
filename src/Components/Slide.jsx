/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const Slide = ({ image, text }) => {
  return (
    <div className="flex flex-col md:flex-row items-center bg-white dark:bg-gray-900 rounded-lg overflow-hidden transition-colors duration-300">
      {/* Image Section */}
      <div
        className="w-full md:w-1/2 h-64 md:h-[28rem] bg-cover bg-center"
        style={{
          backgroundImage: `url(${image})`,
        }}
      ></div>
      {/* bg-gradient-to-b from-teal-50 to-white */}

      {/* Text Section */}
      <div className="w-full md:w-1/2 p-6 md:p-12   flex flex-col justify-center transition-colors duration-300">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800 dark:text-gray-800 mb-4">
          {text}
        </h1>
        <p className="text-gray-600 dark:text-gray-800 text-sm md:text-base mb-6">
          Join us in making a difference. Be a part of something bigger and help
          those in need by becoming a volunteer in our medical camps.
        </p>
        <div>
          <Link
            to="/available-camps"
            className="px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105"
          >
            See All
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Slide;
