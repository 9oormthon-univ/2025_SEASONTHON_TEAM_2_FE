import { Link } from "react-router-dom";
import { KakaoChatbubble } from "../assets/icons";

interface KakaoSocialBtnProps {
    onSuccess?: () => void;
}

export default function KakaoSocialBtn({ onSuccess }: KakaoSocialBtnProps) {
    const KAKAO_SOCIAL_LOGIN_LINK = `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_KAKAO_AUTH_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}&response_type=code`;

    // onSuccess는 현재 사용되지 않지만, 향후 로그인 성공 후 콜백으로 사용할 수 있음
    console.log('KakaoSocialBtn rendered', { onSuccess });

    return (
        <Link to={KAKAO_SOCIAL_LOGIN_LINK} className="bg-[#FEE501] relative flex items-center justify-center  w-[300px] h-[45px] rounded-lg">
            <img src={KakaoChatbubble} className="absolute left-3.5" />
            <p className="font-semibold text-[15px]">카카오 로그인</p>
        </Link>
    )
}
