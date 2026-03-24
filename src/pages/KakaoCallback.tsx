// 카카오 OAuth 콜백 페이지: 인가 코드를 받아 서비스 로그인까지 처리합니다.
import { useEffect, useRef } from "react"; // useRef를 import 합니다.
import { useNavigate } from "react-router-dom";
import { getKakaoToken, loginToServer } from "../api/authKakao";
import { getUserProfile } from "../api/user";

export default function KakaoCallback() {
    const code =
        new URL(document.location.toString()).searchParams.get("code") || "";
    const navigate = useNavigate();
    const isProcessing = useRef(false); // ✅ 실행 여부를 체크하기 위한 ref 추가

    useEffect(() => {
        const handleLogin = async () => {
            try {
                const idToken = await getKakaoToken(code);
                const accessToken = await loginToServer(idToken);
                const userInfo = await getUserProfile(accessToken);

                if (userInfo?.role === "ROLE_USER") {
                    navigate("/home");
                } else {
                    if (window.innerWidth <= 1023) {
                        navigate("/mobile/on-boarding");
                    } else {
                        navigate("/auth/on-boarding");
                    }
                }
            } catch (error) {
                console.error("로그인 처리 중 에러 발생:", error);
                navigate("/"); // 에러 발생 시 메인 페이지로 이동
            }
        };

        if (code && !isProcessing.current) {
            isProcessing.current = true; // 실행 중이라고 표시
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