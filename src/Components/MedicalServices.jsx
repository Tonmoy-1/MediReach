import {
  FaHeartbeat,
  FaStethoscope,
  FaCapsules,
  FaUserMd,
} from "react-icons/fa";

const MedicalServices = () => {
  const services = [
    {
      icon: <FaHeartbeat className="text-teal-600 text-4xl" />,
      title: "Cardiology",
      description:
        "Comprehensive heart care, including check-ups, diagnosis, and treatment.",
    },
    {
      icon: <FaStethoscope className="text-teal-600 text-4xl" />,
      title: "General Check-Ups",
      description: "Routine health check-ups to monitor your well-being.",
    },
    {
      icon: <FaCapsules className="text-teal-600 text-4xl" />,
      title: "Pharmacy Services",
      description: "Access to essential medicines and prescriptions on-site.",
    },
    {
      icon: <FaUserMd className="text-teal-600 text-4xl" />,
      title: "Specialist Consultation",
      description:
        "Consult with top specialists for personalized treatment plans.",
    },
  ];

  return (
    <div className="bg-gray-100 dark:bg-gray-900 py-16">
      <div className="container mx-auto px-6 md:px-12 text-center">
        {/* Heading Section */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
          Medical Services Provided
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg mb-10">
          Explore a wide range of medical services offered at our camps to
          ensure complete care for you and your family.
        </p>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition duration-300"
            >
              <div className="mb-4 flex text-center items-center justify-center">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MedicalServices;
