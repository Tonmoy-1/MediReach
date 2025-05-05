import { FaQuoteLeft } from "react-icons/fa";

export default function Testimonials() {
  const reviews = [
    {
      name: "Sarah W.",
      text: "MediReach made it so easy to find a doctor. Highly recommended!",
    },
    {
      name: "James D.",
      text: "Telemedicine service was seamless and professional!",
    },
    {
      name: "Emily R.",
      text: "The platform is user-friendly and reliable. A game-changer for healthcare!",
    },
  ];

  return (
    <section className="bg-gradient-to-tl from-teal-100 to-white dark:from-teal-900 dark:to-gray-800 py-16 px-6 md:px-12">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white mb-8 tracking-wide">
          What Our Users Say
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mt-2 mb-8 max-w-3xl mx-auto leading-relaxed">
          Hear from real people who trust MediReach for their healthcare needs.
        </p>
      </div>

      {/* Testimonial Cards with enhanced hover effects */}
      <div className="mt-12 flex overflow-x-scroll space-x-6 scrollbar-hide">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:translate-y-2 w-80"
          >
            <FaQuoteLeft className="text-gray-400 dark:text-gray-600 text-4xl mb-4 animate-pulse" />
            <p className="text-lg text-gray-800 dark:text-white italic mt-4">
              {review.text}
            </p>
            <p className="text-[#10B98E] font-semibold mt-4 text-base">
              — {review.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
