import { createBrowserRouter, Outlet } from "react-router-dom";
import MainPage from "./pages/MainPage";
import KakaoCallback from "./pages/KakaoCallback";
import Header from "./components/Header";
import Home from "./pages/Home";
import HomeIndex from "./pages/HomeIndex";
import IntroPage from "./pages/onboarding/IntroPage";
import TermsPage from "./pages/onboarding/TermsPage";
import UserInfoPage from "./pages/onboarding/UserInfoPage";
import CreateCompletePage from "./pages/onboarding/CreateCompletePage";
import JoinQuestionPage from "./pages/onboarding/JoinQuestionPage";
import JoinPendingPage from "./pages/onboarding/JoinPendingPage";
import FamilyBookshelfDetail from "./components/bookshelf/FamilyBookshelfDetail.tsx";
import FamilyManage from "./components/home/FamilyManage.tsx";
import NotificationsPage from "./pages/NotificationsPage";
import FamilyInvitePage from "./pages/FamilyInvitePage";
import PublicLayout from "./router/PublicLayout.tsx";
import PrivateLayout from "./router/PrivateLayout.tsx";
import BookPage from "./pages/mobile/BookPage";
import MemoPage from "./pages/mobile/MemoPage";
import ProfilePage from "./pages/mobile/ProfilePage";

export const router = createBrowserRouter([
    {
        element: <PublicLayout />,
        children: [
            { path: "/", element: <MainPage /> },
            { path: "/invite/:familyCode", element: <FamilyInvitePage /> },
            {
                path: "/auth",
                element: (
                    <div className="relative w-screen h-screen max-w-[1440px] m-auto">
                        <Header />
                        <Outlet />
                    </div>
                ),
                children: [
                    { path: "kakao/callback", element: <KakaoCallback /> },
                    {
                        path: "on-boarding",
                        children: [
                            { index: true, element: <IntroPage /> },
                            { path: "terms", element: <TermsPage /> },
                            { path: "user-info", element: <UserInfoPage /> },
                            { path: "create-complete", element: <CreateCompletePage /> },
                            { path: "join-question", element: <JoinQuestionPage /> },
                            { path: "join-pending", element: <JoinPendingPage /> }
                        ]
                    }
                ]
            }
        ]
    },
    {
        element: <PrivateLayout />,
        children: [
            {
                path: "/home",
                element: <Home />,
                children: [
                    { index: true, element: <HomeIndex /> },
                    { path: "books/:bookId", element: <FamilyBookshelfDetail /> },
                    { path: "family/manage", element: <FamilyManage /> }
                ]
            },
            {
                path: "/notifications",
                element: <NotificationsPage />
            },
            // feature/mobile-ui 브랜치에서 추가된 모바일 페이지들을 PrivateLayout 하위에 추가
            { path: "/book", element: <BookPage isLarge={false} /> },
            { path: "/memo", element: <MemoPage isLarge={false} /> },
            { path: "/profile", element: <ProfilePage isLarge={false} /> },
            { path: "/mobilenotifications", element: <NotificationsPage /> },
        ]
    }
]);