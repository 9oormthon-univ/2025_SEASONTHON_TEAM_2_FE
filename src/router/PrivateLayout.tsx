import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/auth';

const PrivateLayout = () => {
    const { user, familyCode } = useAuthStore();

    if (!user || !familyCode) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default PrivateLayout;
