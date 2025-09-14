import { KakaoChatbubble } from "../assets/icons";

interface KakaoSocialBtnProps {
    onSuccess?: () => void;
}

export default function KakaoSocialBtn({ onSuccess }: KakaoSocialBtnProps) {
    const KAKAO_SOCIAL_LOGIN_LINK = `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_KAKAO_AUTH_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}&response_type=code`;

    const handleLogin = () => {
        if (onSuccess) {
            onSuccess();
        }
        window.location.href = KAKAO_SOCIAL_LOGIN_LINK;
    }

    return (
        <button onClick={handleLogin} className="bg-[#FEE501] relative flex items-center justify-center  w-[300px] h-[45px] rounded-lg">
            <img src={KakaoChatbubble} className="absolute left-3.5" />
            <p className="font-semibold text-[15px]">카카오 로그인</p>
        </button>
    )
}
