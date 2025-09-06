import axios from "axios";

interface IUserInfo {
  email: string;
  familyCode: string;
  nickname: string;
  profileUrl: string;
  role: string;
  userId: number;
}
const getUserProfile = async (accessToken: string): Promise<IUserInfo> => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  console.log("✅ 유저 정보 조회 성공", res.data);
  return res.data.data;
};

export { getUserProfile };
