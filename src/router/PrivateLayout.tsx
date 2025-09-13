import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/auth';

const PrivateLayout = () => {
    const { user } = useAuthStore();

    if (!user) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default PrivateLayout;
