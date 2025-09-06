import axios from "axios";

export interface IFamilyJoinRequstResponse {
  code: string;
  data: {
    verificationQuestion: string;
  };
  message: string;
  success: boolean;
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

export { familyJoinRequest, familyJoinComplete };
