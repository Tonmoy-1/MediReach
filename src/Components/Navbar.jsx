import { useState } from "react";
import { Link } from "react-router-dom";
import {
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

  return (
    <nav className="bg-white md:mx-4">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo and Website Name */}
        <div className="flex items-center">
          <FaStethoscope className="text-teal-600 text-4xl" />
          <h1 className=" hidden md:block text-2xl font-bold text-teal-600">
            MediReach
          </h1>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <Link
            to="/"
            className="flex items-center text-gray-700 hover:text-teal-600 transition"
          >
            <FaHome className="mr-1" /> Home
          </Link>
          <Link
            to="/available-camps"
            className="flex items-center text-gray-700 hover:text-teal-600 transition"
          >
            <FaCampground className="mr-1" /> Available Camps
          </Link>

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
                <div className="absolute z-50 right-0 mt-2 bg-white shadow-lg border rounded-lg py-2 w-48">
                  <div className="flex items-center px-4 py-2 text-sm text-gray-800 border-b">
                    <FaUserCircle className="mr-2 text-teal-600" />
                    {user?.displayName}
                  </div>
                  <Link
                    to={`${
                      role === "user"
                        ? "/dashboard/analytics"
                        : "/dashboard/admin-profile"
                    }`}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-teal-100"
                  >
                    <MdDashboard className="mr-2" /> Dashboard
                  </Link>
                  <button
                    onClick={logOut}
                    className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-teal-100"
                  >
                    <MdLogout className="mr-2" /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition"
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
