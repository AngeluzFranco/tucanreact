import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;  // ✅ Permite mostrar los componentes hijos
};

export default ProtectedRoute;
