import Telemedicinepic from "../assets/Telemedicine.jpg";

export default function Telemedicine() {
  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <img
          src={Telemedicinepic}
          alt="Telemedicine"
          className="w-full md:w-1/2 rounded-lg shadow-lg"
        />

        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            Telemedicine Services
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-4">
            Get expert medical advice from the comfort of your home. Book
            virtual consultations with certified doctors anytime, anywhere.
          </p>
          <button className="mt-6 bg-[#10B98E] text-white py-3 px-6 rounded-lg shadow-md hover:bg-[#0e9a78] transition">
            Book a Virtual Consultation
          </button>
        </div>
      </div>
    </section>
  );
}
