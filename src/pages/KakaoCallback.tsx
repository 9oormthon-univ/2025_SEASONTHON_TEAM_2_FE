import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getKakaoToken, loginToServer } from "../api/authKakao";
import { getUserProfile } from "../api/user";

export default function KakaoCallback() {
    const code = new URL(document.location.toString()).searchParams.get('code') || "";
    const navigate = useNavigate();

    useEffect(() => {
        const handleLogin = async () => {
            try {
                const idToken = await getKakaoToken(code);
                const accessToken = await loginToServer(idToken);
                const userInfo = await getUserProfile(accessToken);

                if (userInfo?.role === "ROLE_USER") {
                    navigate("/home");
                }
                else navigate("/auth/on-boarding");
            } catch (error) {
                console.error("로그인 처리 중 에러 발생:", error);
            }
        };

        if (code) {
            handleLogin();
        }
    }, [code, navigate]);

    return (
        <div className="min-h-screen w-full bg-back-color flex items-center justify-center px-6">
            <div className="w-full max-w-[430px] bg-white rounded-2xl shadow-md p-10 flex flex-col items-center text-center gap-4 animate-pulse">
                <h1 className="text-primary-300 text-[24px] lg:text-[32px] font-kccganpan leading-snug">
                    로그인 처리 중입니다...
                </h1>
                <p className="text-primary-200 text-[16px] lg:text-[20px] font-semibold">
                    잠시만 기다려주세요
                </p>
            </div>
        </div>
    );
}
