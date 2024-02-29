import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { LOGIN } from "../../routes/CONSTANT";

const ProtectedRoute = ({ component: Component }) => {
  const token = useSelector((state) => state.user.token);

  const isAuthenticated = token !== null && token !== undefined;

  return <>{isAuthenticated ? <Component /> : <Navigate to={LOGIN} />}</>;
};

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default ProtectedRoute;
