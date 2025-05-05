import Telemedicinepic from "../assets/Telemedicine.jpg";

export default function Telemedicine() {
  return (
    <section className="bg-gradient-to-tl from-teal-100 to-white dark:from-teal-900 dark:to-gray-800 py-16 px-6 md:px-12 transition-colors duration-300">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Image with smooth hover effect */}
        <img
          src={Telemedicinepic}
          alt="Telemedicine"
          className="w-full md:w-1/2 rounded-xl shadow-2xl transform transition duration-500 hover:scale-105 hover:shadow-2xl"
        />

        {/* Text Section */}
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white mb-4 animate-fade-in-up">
            Telemedicine Services
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-4 max-w-3xl mx-auto leading-relaxed animate-fade-in-up">
            Get expert medical advice from the comfort of your home. Book
            virtual consultations with certified doctors anytime, anywhere.
          </p>
          <button className="mt-6 bg-[#10B98E] text-white py-3 px-8 rounded-lg shadow-lg hover:bg-[#0e9a78] transition transform duration-300 hover:scale-110 hover:shadow-xl">
            Book a Virtual Consultation
          </button>
        </div>
      </div>
    </section>
  );
}
