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
import RegisteredCamps from "../Pages/RegisteredCamps";
import FeedbackSubmitPage from "../Pages/FeedbackSubmitPage";
import PrivateRoute from "./PrivetRoute";
import AdminRoute from "./AdminRoute";
import UserRoute from "./UserRoute";

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
        element: (
          <PrivateRoute>
            <CampDetailPage></CampDetailPage>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      // admin pages
      {
        path: "/dashboard/admin-profile",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AdminProfile></AdminProfile>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/add-camp",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AddCampPage></AddCampPage>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/manage-camps",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageCampsPage></ManageCampsPage>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/updatecamp/:id",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <UpdateCampPage></UpdateCampPage>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/manage-registered-camps",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageRegisteredCamps></ManageRegisteredCamps>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      // userPages
      {
        path: "/dashboard/user-profile",
        element: (
          <PrivateRoute>
            <UserRoute>
              <UserProfile></UserProfile>
            </UserRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/registered-camps",
        element: (
          <PrivateRoute>
            <UserRoute>
              <RegisteredCamps></RegisteredCamps>
            </UserRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/send-feedback",
        element: (
          <PrivateRoute>
            <UserRoute>
              <FeedbackSubmitPage></FeedbackSubmitPage>
            </UserRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
