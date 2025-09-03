import { createBrowserRouter, Outlet } from "react-router-dom";
import MainPage from "./pages/MainPage";
import KakaoCallback from "./pages/KakaoCallback";
import Header from "./components/Header";
import OnBoarding from "./pages/OnBoarding";
import Home from "./pages/Home";
export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />,
    }, {
        path: "/auth",
        element:
            <div className="relative w-screen h-screen">
                <Header />
                <Outlet />
            </div>,
        children: [
            { path: "kakao/callback", element: <KakaoCallback /> },
            { path: "on-boarding", element: <OnBoarding /> }
        ]
    }, {
        path: "/home",
        element: <Home />
    }
])