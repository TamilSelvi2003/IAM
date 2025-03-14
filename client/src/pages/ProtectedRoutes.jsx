import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const user = useSelector((state) => state.Auth.user);
  const allowedRoutes = useSelector((state) => state.route.routes);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user.role === "admin") {
    return <Outlet />;
  }

  const currentPath = location.pathname;
  if (!allowedRoutes.includes(currentPath)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />; 
};

export default ProtectedRoute;
