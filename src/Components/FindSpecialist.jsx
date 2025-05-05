import {
  FaUserMd,
  FaStethoscope,
  FaHeartbeat,
  FaBrain,
  FaSearch,
} from "react-icons/fa";

export default function FindSpecialist() {
  const specialists = [
    {
      name: "Dr. John Doe",
      specialty: "Cardiologist",
      icon: <FaHeartbeat />,
      available: "Available Now",
    },
    {
      name: "Dr. Sarah Lee",
      specialty: "Neurologist",
      icon: <FaBrain />,
      available: "Available Tomorrow",
    },
    {
      name: "Dr. Alex Smith",
      specialty: "General Physician",
      icon: <FaStethoscope />,
      available: "Available Now",
    },
    {
      name: "Dr. Emily Davis",
      specialty: "Pediatrician",
      icon: <FaUserMd />,
      available: "Available Next Week",
    },
  ];

  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-16 px-6 md:px-12 lg:px-20 transition-colors duration-300">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6 tracking-wide">
          Find a Specialist
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Search and connect with top medical professionals for expert
          consultations.
        </p>
      </div>

      {/* Search Bar */}
      <div className="mt-8 flex justify-center">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search for a specialist..."
            className="w-full px-5 py-3 rounded-lg shadow-md text-gray-800 dark:text-white dark:bg-gray-800 dark:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#10B98E]"
          />
          <FaSearch className="absolute right-4 top-3 text-gray-500 dark:text-gray-400" />
        </div>
      </div>

      {/* Specialist Cards */}
      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4 text-center">
        {specialists.map((specialist, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-105"
          >
            <div className="flex justify-center text-5xl text-[#10B98E] mb-4">
              {specialist.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              {specialist.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {specialist.specialty}
            </p>
            <p className="mt-2 text-sm font-medium text-[#10B98E]">
              {specialist.available}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
