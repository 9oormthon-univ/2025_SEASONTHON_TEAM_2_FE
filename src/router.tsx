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


export const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
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
                                    { path: "join-pending", element: <JoinPendingPage /> },

                                    { path: "mobile/user-info", element: <MobileUserInfoPage /> },
                                    { path: "mobile/family-invite", element: <MobileFamilyInvitePage /> },

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
                    { path: "/book", element: <BookPage/> },
                    { path: "/memo", element: <MemoPage/> },
                    { path: "/profile", element: <ProfilePage isLarge={false} /> },
                    { path: "/mobile/notifications", element: <MobileNotificationsPage /> },
                    { path:"/today", element: <LargeTodaysQuestionPage/>},
                ]
            }
        ]
    }
]);