// 라우팅 트리를 정의하는 파일입니다.
// - PublicLayout과 PrivateLayout으로 인증 상태에 따라 페이지를 분기합니다.
// - 중첩 라우트로 레이아웃을 구성하고, 일부 모바일 전용 라우트도 포함합니다.
import { createBrowserRouter, Outlet } from "react-router-dom";
import MainPage from "./pages/MainPage";
import KakaoCallback from "./pages/KakaoCallback";
import Header from "./components/Header";
import Home from "./pages/Home";
import IntroPage from "./pages/onboarding/IntroPage";
import TermsPage from "./pages/onboarding/TermsPage";
import UserInfoPage from "./pages/onboarding/UserInfoPage";
import CreateCompletePage from "./pages/onboarding/CreateCompletePage";
import JoinQuestionPage from "./pages/onboarding/JoinQuestionPage";
import JoinPendingPage from "./pages/onboarding/JoinPendingPage";
import NotificationsPage from "./pages/NotificationsPage";
import FamilyInvitePage from "./pages/FamilyInvitePage";
import PublicLayout from "./router/PublicLayout.tsx";
import PrivateLayout from "./router/PrivateLayout.tsx";
import RootLayout from "./router/RootLayout.tsx";

import MemoPage from "./pages/mobile/MemoPage";
import ProfilePage from "./pages/mobile/ProfilePage";
import LargeTodaysQuestionPage from "./pages/mobile/LargeTodaysQuestionPage.tsx";
import MobileNotificationsPage from "./pages/mobile/MobileNotificationsPage.tsx";
import HomeIndex from "./pages/HomeIndex.tsx";
import FamilyBookshelfDetail from "./components/bookshelf/FamilyBookshelfDetail.tsx";
import FamilyManage from "./components/home/FamilyManage.tsx";
import BookPage from "./pages/mobile/BookPage.tsx";
import MobileUserInfoPage from "./pages/onboarding/MobileUserInfoPage.tsx";
import MobileFamilyInvitePage from "./pages/onboarding/MobileFamilyInvitePage.tsx";
import FamilyMemoDetail from "./components/FamilyMemoDetail.tsx";


// 앱 전역에서 사용할 라우터 인스턴스를 생성합니다.
export const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            {
                element: <PublicLayout />,
                children: [
                    // 랜딩 페이지
                    { path: "/", element: <MainPage /> },
                    // 모바일 온보딩 진입점 (공개 경로)
                    { path: "mobile/on-boarding", element: <IntroPage /> },
                    { path: "mobile/user-info", element: <MobileUserInfoPage /> },
                    { path: "mobile/family-invite", element: <MobileFamilyInvitePage /> },

                    // 초대 코드로 진입하는 라우트 (공개 경로)
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
                            // 카카오 로그인 콜백 처리
                            { path: "kakao/callback", element: <KakaoCallback /> },
                            {
                                path: "on-boarding",
                                children: [
                                    { index: true, element: <IntroPage /> },
                                    { path: "terms", element: <TermsPage /> },
                                    { path: "user-info", element: <UserInfoPage /> },
                                    { path: "create-complete", element: <CreateCompletePage /> },
                                    { path: "join-question", element: <JoinQuestionPage /> },
                                    { path: "join-pending", element: <JoinPendingPage /> },
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
                            // 홈 대시보드
                            { index: true, element: <HomeIndex /> },
                            // 책 상세 보기
                            { path: "books/:bookId", element: <FamilyBookshelfDetail /> },
                            // 가족 관리 페이지
                            { path: "family/manage", element: <FamilyManage /> },
                            // 가족 메모 상세
                            { path: "family/memo", element: <FamilyMemoDetail /> },
                        ]
                    },
                    {
                        path: "/notifications",
                        element: <NotificationsPage />
                    },
                    // 모바일 전용 페이지
                    { path: "/book", element: <BookPage /> },
                    { path: "/memo", element: <MemoPage /> },
                    { path: "/profile", element: <ProfilePage /> },
                    { path: "/mobile/notifications", element: <MobileNotificationsPage /> },
                    { path: "/today", element: <LargeTodaysQuestionPage /> },
                ]
            }
        ]
    }
]);