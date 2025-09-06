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
                //받은 액세스 토큰으로 유저 정보 가져오기
                const userInfo = await getUserProfile(accessToken);
                localStorage.setItem("userInfo", `${userInfo.email}|${userInfo.nickname}|${userInfo.profileUrl}`);

                if (userInfo.role === "ROLE_USER") {
                    navigate("/home");
                }
                else navigate("/auth/on-boarding");
            } catch (error) {
                console.error("로그인 처리 중 에러 발생:", error);
                // 에러 발생 시 예외 처리 에러 페이지로 이동
                // navigate("/error");
            }
        };

        if (code) {
            handleLogin();
        }
    }, [code, navigate]);


    return (
        <div className="relative w-screen h-screen max-w-[1440px] m-auto">
            <div className="h-full flex flex-col gap-2 text-center font-extrabold animate-pulse relative items-center justify-center">
                <h1 className="text-primary-300 text-[40px] font-kccganpan">로그인 처리 중입니다...</h1>
                <p className="text-primary-200 text-[28px] font-extrabold">잠시만 기다려주세요</p>
            </div>
        </div>
    )
}