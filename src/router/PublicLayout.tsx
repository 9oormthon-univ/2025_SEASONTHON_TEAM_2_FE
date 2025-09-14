import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/auth';

const PublicLayout = () => {
    const { user } = useAuthStore();

    if (user?.role === "ROLE_USER") {
        return <Navigate to="/home" replace />;
    }

    return <Outlet />;
};

export default PublicLayout;
