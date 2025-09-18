// 카카오 OAuth 관련 API 유틸리티
// - 인가 코드로 카카오 토큰(ID 토큰)을 발급받습니다.
// - 발급받은 ID 토큰으로 백엔드에 로그인하여 서비스 토큰을 저장합니다.
import axios from "axios";
import { useAuthStore } from "../store/auth";

// 카카오 인가 코드로 ID 토큰을 교환합니다.
const getKakaoToken = async (code: string) => {
  const params = {
    grant_type: "authorization_code",
    client_id: import.meta.env.VITE_KAKAO_AUTH_CLIENT_ID,
    redirect_uri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
    code,
  };
  const res = await axios.post("https://kauth.kakao.com/oauth/token", null, {
    params,
  });
  console.log("✅ 카카오 토큰 발급 성공", res.data);
  return res.data.id_token;
};

// 백엔드에 ID 토큰을 전달하여 서비스용 액세스 토큰을 발급받고 저장합니다.
const loginToServer = async (id_token: string) => {
  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/auth/login`,
    null,
    {
      headers: { id_token },
    }
  );
  console.log("✅ 서비스 로그인 성공", res.data);
  const token: string = res.data.data.accessToken;
  try {
    useAuthStore.getState().setRefreshToken(token);
    useAuthStore.getState().setAccessToken(token);
  } catch {
    throw new Error("엑세스 토큰 저장 실패");
  }
  return token;
};

export { getKakaoToken, loginToServer };
