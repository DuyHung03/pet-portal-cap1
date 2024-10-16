import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const ProtectedRoute = ({ element, allowedRoles }) => {
  const { isAuthenticated, role } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated || (role && !allowedRoles.includes(role))) {
    console.log(location);

    return (
      <Navigate to="/login" replace state={{ prevUrl: location.pathname }} />
    );
  }

  return element;
};

export default ProtectedRoute;
