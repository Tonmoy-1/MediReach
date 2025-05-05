import { useEffect, useState } from "react";

export default function AboutUs() {
  const [darkMode, setDarkMode] = useState(false);

  // Check user's system preference or localStorage for saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark"); // Add dark class to html
    } else if (savedTheme === "light") {
      setDarkMode(false);
      document.documentElement.classList.remove("dark"); // Remove dark class
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Toggle dark mode
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-16 px-6 md:px-12 lg:px-20 transition-colors duration-300">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
          About Us
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          MediReach is dedicated to bridging the gap between patients and
          healthcare services, ensuring accessible and efficient medical care.
          Our mission is to simplify medical service discovery, appointment
          booking, and healthcare management.
        </p>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4 text-center">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md dark:shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            Seamless Access
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Connect with qualified medical professionals in just a few clicks.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md dark:shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            Verified Professionals
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            We ensure every healthcare provider on our platform is certified and
            experienced.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md dark:shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            User-Friendly Platform
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            A hassle-free experience with an intuitive interface.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md dark:shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            24/7 Availability
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Get healthcare assistance anytime, anywhere.
          </p>
        </div>
      </div>

      <div className="mt-16 text-center">
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Our Mission
        </h3>
        <p className="text-lg text-gray-600 dark:text-gray-300 mt-4 max-w-3xl mx-auto">
          At MediReach, we believe that healthcare should be{" "}
          <span className="font-semibold">accessible</span>,
          <span className="font-semibold"> affordable</span>, and{" "}
          <span className="font-semibold">efficient</span>. Our goal is to
          empower individuals by providing a reliable platform for medical
          consultations, emergency services, and personalized healthcare
          solutions.
        </p>
      </div>

      <div className="mt-12 text-center">
        <button className="bg-[#10B98E] text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-[#0e9a78] transition">
          Join Us Today
        </button>
      </div>

      {/* Dark Mode Toggle Button */}
      <div className="mt-8 text-center">
        <button
          onClick={toggleTheme}
          className="bg-gray-800 text-white font-semibold py-2 px-6 rounded-full hover:bg-gray-700 transition-colors duration-300"
        >
          Toggle {darkMode ? "Light" : "Dark"} Mode
        </button>
      </div>
    </section>
  );
}
