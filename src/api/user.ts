import axios from "axios";
import { useAuthStore, type AuthUser } from "../store/auth";
import axiosInstance from "./axiosInstance";
import { SuccessToast } from "../components/toast/SuccessToast";

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

const modifyNickname = async (nickname: string) => {
  try {
    const res = await axiosInstance.patch("/api/users/me/nickname", {
      nickname,
    });
    if (res.data.success) {
      SuccessToast("닉네임 수정을 완료했습니다. 잠시 후 로그아웃 됩니다.");
      await authLogout();
    }
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response) {
        console.error("서버 응답 에러 데이터 : ", err.response.data.message);
      } else if (err.request) {
        console.error("요청 에러 : ", err.request);
      } else {
        console.error("알수없는 에러 : ", err);
      }
    }
  }
};

const modifyProfileImg = async (profileImg: File) => {
  const formData = new FormData();

  formData.append("file", profileImg);

  try {
    const res = await axiosInstance.patch(
      "/api/users/me/profileImage",
      formData
    );
    if (res.data.success) {
      SuccessToast(
        "프로필 이미지 수정에 성공했습니다. 잠시 후 로그아웃 됩니다."
      );
      await authLogout();
    }
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response) {
        console.error("서버 응답 에러 데이터 : ", err.response.data.message);
      } else if (err.request) {
        console.error("요청 에러 : ", err.request);
      } else {
        console.error("알수없는 에러 : ", err);
      }
    }
  }
};

const authLogout = async () => {
  const res = await axiosInstance.post("/auth/logout");
  if (res.data.success) {
    //로그아웃 됐습니다 토스트
    SuccessToast("성공적으로 로그아웃 되었습니다.");
    useAuthStore.getState().clear();
  }
};

export { getUserProfile, modifyNickname, modifyProfileImg, authLogout };
