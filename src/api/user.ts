import axios from "axios";
import { useAuthStore, type AuthUser } from "../store/auth";

const getUserProfile = async (accessToken: string): Promise<AuthUser> => {
  const res = await axios
    .get(`${import.meta.env.VITE_API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then((r) => r.data);
  console.log("✅ 유저 정보 조회 성공", res.data);
  try {
    useAuthStore.getState().setUser(res.data);
  } catch {
    //스토어 저장 실패 했을 때
  }
  return res.data;
};

export { getUserProfile };
