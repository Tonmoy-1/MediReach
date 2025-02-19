import { FaCheckCircle } from "react-icons/fa";

export default function WhyChooseUs() {
  const points = [
    "Verified & Trusted Doctors",
    "24/7 Online Consultations",
    "Seamless Booking Process",
    "Affordable Medical Services",
    "User-Friendly Experience",
  ];

  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-16 px-6 md:px-12">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          Why Choose MediReach?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Here&apos;s why thousands trust MediReach for their healthcare needs.
        </p>
      </div>

      <div className="mt-8 space-y-6 max-w-3xl mx-auto">
        {points.map((point, index) => (
          <div
            key={index}
            className="flex items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
          >
            <FaCheckCircle className="text-[#10B98E] text-2xl" />
            <p className="text-gray-800 dark:text-white text-lg">{point}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
