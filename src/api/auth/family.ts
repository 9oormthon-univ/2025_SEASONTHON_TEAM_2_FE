import axios from "axios";
import axiosInstance from "../axiosInstance.ts";

export interface IFamilyJoinRequstResponse {
  code: string;
  data: {
    verificationQuestion: string;
  };
  message: string;
  success: boolean;
}

export interface IFamilyEditRequest {
  success: boolean;
  message: string;
  data: {
    familyName: string;
    verificationQuestion: string;
    verificationAnswer: string;
  };
}

const familyJoinRequest = async (
  nickname: string,
  inviteCode: string
): Promise<IFamilyJoinRequstResponse> => {
  try {
    const response = await axiosInstance.post<IFamilyJoinRequstResponse>(
      "/family/join/request",
      {
        nickname,
        inviteCode,
      }
    );
    if (!response.data.success) {
      throw new Error(
        response.data.message || "가족 참여 요청에 실패했습니다."
      );
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage =
        error.response.data?.message || "초대 코드가 유효하지 않습니다.";
      throw new Error(errorMessage);
    }
    throw new Error("요청 중 오류가 발생했습니다.");
  }
};

interface IFamilyCreateData {
  nickname: string;
  familyNameOrCode: string;
  verificationQuestion: string;
  verificationAnswer: string;
}

interface IFamilyCreateData {
  nickname: string;
  familyNameOrCode: string; // UI 상태와 관련된 이름
  verificationQuestion: string;
  verificationAnswer: string;
}

// API 성공 시 응답 데이터 타입 (예시)
interface IFamilyCreateResponse {
  success: boolean;
  message: string;
  data?: {
    // 성공 시 추가 데이터가 있다면 정의
    familyId: string;
  };
}

/**
 * 가족 생성 API 요청 함수
 * @param formData - 가족 생성에 필요한 데이터
 * @returns 성공 시 API 응답 데이터를, 실패 시 에러를 throw 합니다.
 */
const familyCreate = async (
  formData: IFamilyCreateData
): Promise<IFamilyCreateResponse> => {
  const payload = {
    nickname: formData.nickname,
    familyName: formData.familyNameOrCode,
    verificationQuestion: formData.verificationQuestion,
    verificationAnswer: formData.verificationAnswer,
  };

  try {
    const response = await axiosInstance.post<IFamilyCreateResponse>(
      "/family/create",
      payload
    );

    if (!response.data.success) {
      throw new Error(response.data.message || "가족 생성에 실패했습니다.");
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage =
        error.response.data?.message || "서버 요청 중 오류가 발생했습니다.";
      throw new Error(errorMessage);
    }

    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
};

export interface IFamilyJoinCompleteResponse {
  code: string;
  data: string;
  message: string;
  success: boolean;
}

const familyJoinComplete = async (
  inviteCode: string,
  verificationAnswer: string
): Promise<IFamilyJoinCompleteResponse> => {
  try {
    const response = await axiosInstance.post<IFamilyJoinCompleteResponse>(
      "/family/join/complete",
      {
        inviteCode,
        verificationAnswer,
      }
    );

    // 비즈니스 로직 상 실패 처리
    if (!response.data.success) {
      throw new Error(
        response.data.message || "가족 참여 완료에 실패했습니다."
      );
    }

    return response.data;
  } catch (error) {
    // Axios 에러인 경우 서버가 보낸 구체적인 에러 메시지(예: 정답 불일치)를 전달
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage =
        error.response.data?.message || "정답이 일치하지 않습니다.";
      throw new Error(errorMessage);
    }
    // 그 외 네트워크 에러 등
    throw new Error("요청 중 오류가 발생했습니다.");
  }
};

interface IFamilyMyMembers {
  familyName: string;
  members: {
    nickname: string;
    profileUrl: string;
    id: number;
  }[];
}

const getMyFamilyMembers = async () => {
  const res = await axiosInstance
    .get<{ data: IFamilyMyMembers }>("/family/my/members")
    .then((r) => r.data);
  return res.data || [];
};

const createFamily = async (familyName: string) => {
  const res = await axiosInstance.post("/family", { familyName });
  return res.data;
};

const getFamilyInfo = async () => {
  // 👇 엔드포인트를 '/family/my'로 수정하고, 반환값을 res.data.data로 변경
  const res = await axiosInstance.get("/family/my");
  return res.data.data;
};

const joinFamily = async (inviteCode: string) => {
  const res = await axiosInstance.post("/family/join", { inviteCode });
  return res.data;
};

const editFamilyInfo = async (data: IFamilyEditRequest) => {
  const res = await axiosInstance.patch("/family/edit", data);
  return res.data;
};

const getProgressFamily = async () => {
  const res = await axiosInstance.get("/api/home/progress");
  return res.data.data.percentage;
};

export {
  familyJoinRequest,
  familyJoinComplete,
  getMyFamilyMembers,
  getFamilyInfo,
  joinFamily,
  createFamily,
  editFamilyInfo,
  getProgressFamily,
  familyCreate,
};
