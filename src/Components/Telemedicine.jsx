import Telemedicinepic from "../assets/Telemedicine.jpg";

export default function Telemedicine() {
  return (
    <section className="bg-gradient-to-tl from-teal-100 to-white dark:from-teal-900 dark:to-gray-800 py-16 px-6 md:px-12 transition-colors duration-300">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <img
          src={Telemedicinepic}
          alt="Telemedicine"
          className="w-full md:w-1/2 rounded-lg shadow-lg transition-transform duration-500 hover:scale-105"
        />

        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white">
            Telemedicine Services
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-4 max-w-3xl mx-auto">
            Get expert medical advice from the comfort of your home. Book
            virtual consultations with certified doctors anytime, anywhere.
          </p>
          <button className="mt-6 bg-[#10B98E] text-white py-3 px-6 rounded-lg shadow-md hover:bg-[#0e9a78] transition transform duration-300 hover:scale-105">
            Book a Virtual Consultation
          </button>
        </div>
      </div>
    </section>
  );
}
