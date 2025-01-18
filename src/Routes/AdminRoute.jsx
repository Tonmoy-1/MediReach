import PropTypes from "prop-types";
import useRole from "../Hooks/useRole";
import { Navigate } from "react-router-dom";
import Spinner from "../Pages/Spinner";

const AdminRoute = ({ children }) => {
  const [role, isLoading] = useRole();

  if (isLoading) return <Spinner></Spinner>;
  if (role === "admin") return children;
  return <Navigate to="/dashboard" replace="true" />;
};

AdminRoute.propTypes = {
  children: PropTypes.element,
};

export default AdminRoute;
