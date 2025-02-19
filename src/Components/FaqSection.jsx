import { useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";

const faqData = [
  {
    question: "What is MediReach?",
    answer:
      "MediReach is a platform designed to connect patients with healthcare providers efficiently and seamlessly.",
  },
  {
    question: "How can I book an appointment?",
    answer:
      "You can easily book an appointment by signing up, selecting a healthcare provider, and choosing an available slot.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes, we prioritize user privacy and employ the latest security measures to protect your data.",
  },
  {
    question: "Can I cancel or reschedule appointments?",
    answer:
      "Absolutely! You can manage your appointments through your user dashboard.",
  },
  {
    question: "Are there any hidden fees?",
    answer:
      "No, MediReach is transparent with its pricing. You only pay for the services you select.",
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-16 px-6 md:px-12">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Have questions? We&apos;ve got answers!
        </p>
      </div>

      <div className="mt-8 space-y-6 max-w-3xl mx-auto">
        {faqData.map((faq, index) => (
          <div
            key={index}
            onClick={() => toggleFaq(index)}
            className={`flex items-start gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md cursor-pointer transition-all duration-300 ${
              openIndex === index ? "transform scale-105" : ""
            }`}
          >
            <FaQuestionCircle className="text-[#10B98E] text-2xl" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                {faq.question}
              </h3>
              {openIndex === index && (
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  {faq.answer}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FaqSection;
