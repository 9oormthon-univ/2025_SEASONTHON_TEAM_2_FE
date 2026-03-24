// 카카오 소셜 로그인 버튼 컴포넌트
// - 클릭 시 카카오 OAuth 인가 코드 플로우로 리다이렉트합니다.
import { KakaoChatbubble } from "../assets/icons";

interface KakaoSocialBtnProps {
    onSuccess?: () => void;
}

export default function KakaoSocialBtn({ onSuccess }: KakaoSocialBtnProps) {
    const KAKAO_SOCIAL_LOGIN_LINK = `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_KAKAO_AUTH_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}&response_type=code`;

    const handleLogin = () => {
        // 필요 시 부모 콜백을 먼저 호출합니다.
        if (onSuccess) {
            onSuccess();
        }
        window.location.href = KAKAO_SOCIAL_LOGIN_LINK;
    }

    return (
        <button onClick={handleLogin} className="bg-[#FEE501] relative flex items-center justify-center  w-full h-[45px] rounded-lg">
            <img src={KakaoChatbubble} className="absolute left-3.5" />
            <p className="font-semibold text-[15px]">카카오 로그인</p>
        </button>
    )
}
