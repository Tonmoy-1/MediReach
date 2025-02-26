import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaSun,
  FaMoon,
  FaHome,
  FaCampground,
  FaSignInAlt,
  FaUserCircle,
  FaStethoscope,
} from "react-icons/fa";
import { MdDashboard, MdLogout } from "react-icons/md";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [role] = useRole();
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <nav className="navbar fixed top-0 left-0 w-full z-50 px-4 py-3 bg-white dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700 transition mb-14">
      <div className="w-full mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to={"/"}>
          <div className="flex items-center">
            <FaStethoscope className="text-teal-600 dark:text-white text-3xl" />
            <h1 className="hidden md:block text-2xl font-bold text-teal-600 dark:text-white">
              MediReach
            </h1>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <Link
            to="/"
            className="flex items-center text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition"
          >
            <FaHome className="mr-1" /> Home
          </Link>
          <Link
            to="/available-camps"
            className="flex items-center text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition"
          >
            <FaCampground className="mr-1" /> Available Camps
          </Link>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            {darkMode ? (
              <FaSun className="text-yellow-400" />
            ) : (
              <FaMoon className="text-gray-600" />
            )}
          </button>

          {/* Conditionally render Join Us or Profile */}
          {user ? (
            <div className="relative">
              <img
                referrerPolicy="no-referrer"
                src={user?.photoURL}
                alt="Profile"
                className="h-10 w-10 rounded-full cursor-pointer object-cover"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
              {dropdownOpen && (
                <div className="absolute z-50 right-0 mt-2 bg-white dark:bg-gray-800 shadow-lg border rounded-lg py-2 w-48">
                  <div className="flex items-center px-4 py-2 text-sm text-gray-800 dark:text-gray-300 border-b">
                    <FaUserCircle className="mr-2 text-teal-600 dark:text-teal-400" />
                    {user?.displayName}
                  </div>
                  <Link
                    to={`${
                      role === "user"
                        ? "/dashboard/analytics"
                        : "/dashboard/admin-profile"
                    }`}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-teal-100 dark:hover:bg-teal-700"
                  >
                    <MdDashboard className="mr-2" /> Dashboard
                  </Link>
                  <button
                    onClick={logOut}
                    className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-teal-100 dark:hover:bg-teal-700"
                  >
                    <MdLogout className="mr-2" /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center bg-teal-600 dark:bg-teal-700 text-white px-4 py-2 rounded-lg hover:bg-teal-700 dark:hover:bg-teal-600 transition"
            >
              <FaSignInAlt className="mr-2" /> Join Us
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
