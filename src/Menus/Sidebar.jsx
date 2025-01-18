import { useState } from "react";
import { GrLogout } from "react-icons/gr";
import { AiOutlineBars } from "react-icons/ai";
import { Link } from "react-router-dom";
import AdminMenu from "./AdminMenu";
import UserMenu from "./UserMenu";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import MenuItem from "./MenuItem";
import { FaHome } from "react-icons/fa";

const Sidebar = () => {
  const { logOut } = useAuth();
  const [isActive, setActive] = useState(false);
  const [role] = useRole();
  console.log(role);
  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };

  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 flex justify-between md:hidden">
        <div className="flex items-center p-4">
          <Link to="/">
            <img
              src="https://i.ibb.co/4ZXzmq5/logo.png"
              alt="logo"
              className="w-20 h-auto"
            />
          </Link>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200 dark:focus:bg-gray-800"
        >
          <AiOutlineBars className="h-6 w-6" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 dark:bg-gray-900 w-72 space-y-6 px-4 py-6 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        } md:translate-x-0 transition duration-200 ease-in-out shadow-lg`}
      >
        <div>
          <div className="w-full hidden md:flex px-4 py-4 justify-center items-center bg-teal-100 dark:bg-teal-800 rounded-lg mx-auto">
            <Link to="/">
              <img src="MaDical" alt="logo" className="w-24 h-auto" />
            </Link>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            <nav className="space-y-4">
              {/* <AdminMenu />
              <UserMenu /> */}
              {role === "admin" && <AdminMenu />}
              {role === "user" && <UserMenu />}
            </nav>
          </div>
        </div>

        <div>
          <hr className="border-gray-300 dark:border-gray-700" />
          <div>
            <MenuItem icon={FaHome} label="Home" address="/" />
          </div>
          <button
            onClick={logOut}
            className="flex w-full items-center px-4 py-3 mt-5 text-gray-600 dark:text-gray-300 hover:bg-teal-100 dark:hover:bg-teal-800 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-300 transform rounded-lg"
          >
            <GrLogout className="w-5 h-5" />
            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
