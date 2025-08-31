import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function KakaoCallback() {
    //백엔드에 보낼 유저 code
    const code = new URL(document.location.toString()).searchParams.get('code');
    const navigate = useNavigate();

    useEffect(() => {
        //로딩 임시로 구현
        const timer = setTimeout(() => {
            navigate("/auth/on-boarding"); //온보딩 화면으로 리다이렉트 후 닉네임 설정
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);


    return (
        <div className="relative w-screen h-screen">
            <div className="h-full flex flex-col gap-8 text-center font-extrabold animate-pulse relative items-center justify-center">
                <div className="flex flex-col gap-4 ">
                    <h1 className="text-primary-500 text-5xl">로그인 처리 중입니다...</h1>
                    <p className="text-primary-200 text-4xl">잠시만 기다려주세요</p>
                </div>
                <div className="text-left font-gangwon text-4xl flex flex-col gap-8">
                    <p>여러분은 부모님이 좋아하는 색깔을 알고계신가요?</p>
                    <p>여러분은 자녀의 어쩌구를 알고계신가요?</p>
                </div>
            </div>
        </div>
    )
}