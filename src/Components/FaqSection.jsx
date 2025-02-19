// src/components/FaqSection.jsx
import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

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
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-gray-100" id="faq">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4 text-left">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 cursor-pointer transition transform hover:scale-105"
              onClick={() => toggleFaq(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <FiChevronUp className="text-gray-600" />
                ) : (
                  <FiChevronDown className="text-gray-600" />
                )}
              </div>
              {openIndex === index && (
                <p className="mt-2 text-gray-600">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
