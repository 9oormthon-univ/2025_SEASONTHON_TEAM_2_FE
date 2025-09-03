import axios from "axios";

const getUserProfile = async (accessToken: string) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  console.log("✅ 유저 정보 조회 성공", res.data);
  return res.data.data;
};

export { getUserProfile };
