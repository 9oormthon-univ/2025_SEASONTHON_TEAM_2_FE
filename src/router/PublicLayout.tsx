// 공개 레이아웃: 로그인한 유저는 홈으로 리다이렉트, 그 외 공개 라우트 노출
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
