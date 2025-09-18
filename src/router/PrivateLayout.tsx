// 비공개 레이아웃: 인증/가족코드가 없으면 루트로 리다이렉트합니다.
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
