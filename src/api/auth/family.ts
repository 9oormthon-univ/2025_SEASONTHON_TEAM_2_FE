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
    familyName: string;
    verificationQuestion: string;
    verificationAnswer: string;
}

const familyJoinRequest = async (
  nickname: string,
  inviteCode: string
): Promise<IFamilyJoinRequstResponse> => {
  const json: IFamilyJoinRequstResponse = await axios
    .post(
      `${import.meta.env.VITE_API_URL}/family/join/request`,
      {
        nickname,
        inviteCode,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    )
    .then((res) => res.data);

  return json;
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
  const json: IFamilyJoinCompleteResponse = await axios
    .post(
      `${import.meta.env.VITE_API_URL}/family/join/complete`,
      {
        inviteCode,
        verificationAnswer,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    )
    .then((res) => res.data);
  return json;
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
  const data: IFamilyMyMembers = await axios
    .get(`${import.meta.env.VITE_API_URL}/family/my/members`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
    .then((res) => res.data.data);

  return data;
};

const createFamily = async (familyName: string) => {
    const res = await axiosInstance.post('/family', { familyName });
    return res.data;
};

const getFamilyInfo = async () => {
    // 👇 엔드포인트를 '/family/my'로 수정하고, 반환값을 res.data.data로 변경
    const res = await axiosInstance.get('/family/my');
    return res.data.data;
};

const joinFamily = async (inviteCode: string) => {
    const res = await axiosInstance.post('/family/join', { inviteCode });
    return res.data;
};

const editFamilyInfo = async (data: IFamilyEditRequest) => {
    const res = await axiosInstance.patch('/family/edit', data);
    return res.data;
};

export { familyJoinRequest, familyJoinComplete, getMyFamilyMembers, getFamilyInfo, joinFamily, createFamily, editFamilyInfo };
