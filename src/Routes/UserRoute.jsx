import PropTypes from "prop-types";
import useRole from "../Hooks/useRole";
import { Navigate } from "react-router-dom";

const UserRoute = ({ children }) => {
  const [role, isLoading] = useRole();

  if (isLoading) return <p>Laoding...</p>;
  if (role === "user") return children;
  return <Navigate to="/dashboard" replace="true" />;
};

UserRoute.propTypes = {
  children: PropTypes.element,
};

export default UserRoute;
