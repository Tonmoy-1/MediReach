"use client";
import { useEffect, useState } from "react";

export default function PartnerHospitals() {
  const hospitals = [
    { name: "City Medical Center", logo: "/hospital1.png" },
    { name: "Sunrise HealthCare", logo: "/hospital2.png" },
    { name: "Metro Hospital", logo: "/hospital3.png" },
    { name: "Wellness Clinic", logo: "/hospital4.png" },
    { name: "LifeCare Hospital", logo: "/hospital5.png" },
    { name: "Prime Health", logo: "/hospital6.png" },
  ];

  // Auto-scrolling effect
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => (prev - 1) % (hospitals.length * 150)); // Adjust for smooth looping
    }, 40);
    return () => clearInterval(interval);
  }, [hospitals.length]);

  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          Our Partner Hospitals
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          We collaborate with top hospitals to ensure world-class healthcare
          services.
        </p>
      </div>

      {/* Scrolling Logos */}
      <div className="relative overflow-hidden mt-8">
        <div
          className="flex space-x-12 animate-scroll"
          style={{ transform: `translateX(${offset}px)` }}
        >
          {[...hospitals, ...hospitals].map((hospital, index) => (
            <div key={index} className="w-36 h-36 flex flex-col items-center">
              <img
                src={hospital.logo}
                alt={hospital.name}
                className="w-full h-full object-contain rounded-lg shadow-md hover:scale-105 transition"
              />
              <p className="text-sm text-gray-800 dark:text-white mt-2">
                {hospital.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
