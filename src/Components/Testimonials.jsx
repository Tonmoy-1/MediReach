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
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">
          What Our Users Say
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Hear from real people who trust MediReach for their healthcare needs.
        </p>
      </div>

      <div className="mt-8 flex overflow-x-scroll space-x-6 scrollbar-hide">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-105 w-80"
          >
            <FaQuoteLeft className="text-gray-400 dark:text-gray-600 text-4xl mb-4" />
            <p className="text-gray-800 dark:text-white mt-4">{review.text}</p>
            <p className="text-[#10B98E] font-semibold mt-2">— {review.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
