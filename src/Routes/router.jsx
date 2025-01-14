import { createBrowserRouter } from "react-router-dom";
import MainLayOut from "../LayOut/MainLayOut";
import Home from "../Pages/Home";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import CampDetailPage from "../Pages/CampDetailPage";
import AddCampPage from "../Pages/AddCampPage";
import DashboardLayout from "../LayOut/DashboardLayout";
import AdminProfile from "../Pages/AdminPages/AdminProfile";
import UserProfile from "../Pages/UserPages/UserProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut></MainLayOut>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/camp-details/1",
        element: <CampDetailPage></CampDetailPage>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      // admin pages
      {
        path: "/dashboard/admin-profile",
        element: <AdminProfile></AdminProfile>,
      },
      {
        path: "/dashboard/add-camp",
        element: <AddCampPage></AddCampPage>,
      },
      // userPages
      {
        path: "/dashboard/user-profile",
        element: <UserProfile></UserProfile>,
      },
    ],
  },
]);
