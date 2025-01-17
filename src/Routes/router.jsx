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
import AvailableCampsPage from "../Pages/AvailableCampsPage";
import ManageCampsPage from "../Pages/AdminPages/ManageCampsPage";
import UpdateCampPage from "../Pages/AdminPages/UpdateCampPage";
import ManageRegisteredCamps from "../Pages/AdminPages/ManageRegisteredCamps";

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
        path: "/available-camps",
        element: <AvailableCampsPage></AvailableCampsPage>,
      },
      {
        path: "/camp/:id",
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
      {
        path: "/dashboard/manage-camps",
        element: <ManageCampsPage></ManageCampsPage>,
      },
      {
        path: "/dashboard/updatecamp/:id",
        element: <UpdateCampPage></UpdateCampPage>,
      },
      {
        path: "/dashboard/manage-registered-camps",
        element: <ManageRegisteredCamps></ManageRegisteredCamps>,
      },
      // userPages
      {
        path: "/dashboard/user-profile",
        element: <UserProfile></UserProfile>,
      },
    ],
  },
]);
