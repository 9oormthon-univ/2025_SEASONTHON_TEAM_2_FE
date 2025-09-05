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
export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />,
    }, {
        path: "/auth",
        element:
            <div className="relative w-screen h-screen max-w-[1440px] m-auto">
                <Header />
                <Outlet />
            </div>,
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
    }, {
        path: "/home",
        element: <Home />
    }
])