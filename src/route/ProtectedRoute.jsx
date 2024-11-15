import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const ProtectedRoute = ({ element, allowedRoles }) => {
    const { isAuthenticated, role } = useAuthStore();
    const location = useLocation();

    const hasAccess =
        isAuthenticated &&
        Array.isArray(role) &&
        role.some((r) => allowedRoles.includes(r));

    if (!hasAccess) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ prevUrl: location.pathname }}
            />
        );
    }

    return element;
};

export default ProtectedRoute;
