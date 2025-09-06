import axios from "axios";

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

const loginToServer = async (id_token: string) => {
  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/auth/login`,
    null,
    {
      headers: { id_token },
    }
  );
  console.log("✅ 서비스 로그인 성공", res.data);
  localStorage.setItem("accessToken", res.data.data.accessToken);
  return res.data.data.accessToken;
};

export { getKakaoToken, loginToServer };
