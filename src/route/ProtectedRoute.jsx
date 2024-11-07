import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const ProtectedRoute = ({ element, allowedRoles }) => {
    const { isAuthenticated, role } = useAuthStore();
    const location = useLocation();

<<<<<<< HEAD
    if (!isAuthenticated || (role && !allowedRoles.includes(role))) {
        console.log(location);

        return (
            <Navigate
                to="/login"
                replace
                state={{ prevUrl: location.pathname }}
            />
        );
=======
    const hasAccess = role && role.some((r) => allowedRoles.includes(r));

    if (!isAuthenticated || !hasAccess) {
        const prevUrl = location.pathname;
        return <Navigate to="/login" state={{ prevUrl }} />;
>>>>>>> 6612d5709858a596fdf500e63d218d7f5ec8d207
    }

    return element;
};

export default ProtectedRoute;
