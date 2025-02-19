import {
  FaUserCheck,
  FaSearch,
  FaCalendarCheck,
  FaHeartbeat,
} from "react-icons/fa";

export default function HowItWorks() {
  const steps = [
    {
      icon: (
        <FaUserCheck className="text-[#10B98E] text-4xl dark:text-[#10B98E]" />
      ),
      title: "Sign Up & Log In",
      description:
        "Create an account to access MediReach and explore healthcare services.",
    },
    {
      icon: (
        <FaSearch className="text-[#10B98E] text-4xl dark:text-[#10B98E]" />
      ),
      title: "Find a Healthcare Service",
      description:
        "Search for medical professionals, hospitals, or services based on your needs.",
    },
    {
      icon: (
        <FaCalendarCheck className="text-[#10B98E] text-4xl dark:text-[#10B98E]" />
      ),
      title: "Book an Appointment",
      description:
        "Easily schedule a consultation or visit at your preferred time.",
    },
    {
      icon: (
        <FaHeartbeat className="text-[#10B98E] text-4xl dark:text-[#10B98E]" />
      ),
      title: "Get Medical Assistance",
      description:
        "Receive high-quality healthcare and track your medical records.",
    },
  ];

  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-16 px-6 md:px-12 lg:px-20 transition-colors duration-300">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
          How It Works
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          MediReach provides a seamless healthcare experience in just a few
          simple steps.
        </p>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4 text-center">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md dark:shadow-lg transform transition duration-300 hover:scale-105"
          >
            <div className="flex justify-center">{step.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-4">
              {step.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
