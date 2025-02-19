import { useState, useEffect } from "react";
import logo1 from "../assets/pat1.jpg";

export default function PartnerHospitals() {
  const hospitals = [
    { name: "City Medical Center", logo: "../assets/pat1.jpg" },
    { name: "Sunrise HealthCare", logo: "../assets/pat1.jpg" },
    { name: "Metro Hospital", logo: "../assets/pat1.jpg" },
    { name: "Wellness Clinic", logo: "../assets/pat1.jpg" },
    { name: "LifeCare Hospital", logo: "../assets/pat1.jpg" },
    { name: "Prime Health", logo: "../assets/pat1.jpg" },
  ];

  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prevOffset) => (prevOffset - 1) % (hospitals.length * 150)); // Adjust for smooth looping
    }, 30); // Adjust speed of scrolling here
    return () => clearInterval(interval);
  }, [hospitals.length]);

  return (
    <section className="bg-gradient-to-r from-[#10B98E] to-[#0c9c7e] dark:from-[#2D3748] dark:to-[#1A202C] py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-4">
          Our Esteemed Partner Hospitals
        </h2>
        <p className="text-lg text-gray-200 dark:text-gray-300">
          Partnering with leading hospitals to provide world-class healthcare
          services.
        </p>
      </div>

      {/* Scrolling Logos */}
      <div className="relative overflow-hidden mt-8">
        <div
          className="flex space-x-8"
          style={{ transform: `translateX(${offset}px)` }}
        >
          {[...hospitals, ...hospitals].map((hospital, index) => (
            <div
              key={index}
              className="w-96 h-72 flex flex-col items-center relative"
            >
              <div className="w-full h-full overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-110 hover:shadow-xl">
                <img
                  src={logo1}
                  alt={hospital.name}
                  className="w-full h-full object-contain transition-all duration-500 ease-in-out"
                />
              </div>
              {/* Hospital name overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-all duration-300">
                <p className="text-white text-sm font-semibold tracking-wide">
                  {hospital.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
