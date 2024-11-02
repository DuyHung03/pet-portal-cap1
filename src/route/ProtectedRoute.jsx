import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const ProtectedRoute = ({ element, allowedRoles }) => {
    const { isAuthenticated, role } = useAuthStore();
    const location = useLocation();

    const hasAccess = role && role.some((r) => allowedRoles.includes(r));

    if (!isAuthenticated || !hasAccess) {
        const prevUrl = location.pathname;
        return <Navigate to="/login" state={{ prevUrl }} />;
    }

    return element;
};

export default ProtectedRoute;
