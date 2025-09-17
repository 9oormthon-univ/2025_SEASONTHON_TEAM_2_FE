import { type QuestionAnswer } from "../../types";
import axiosInstance from "../axiosInstance";

// 오늘의 질문 API 응답 타입
interface ICurrentTopicResponse {
  activeFrom: string;
  activeUntil: string;
  id: number;
  question: string;
}

// 지난 질문 API 응답 타입
export interface PastQuestionItem {
  id: number;
  question: string;
  answers: QuestionAnswer[];
}

// 1. 오늘의 질문 가져오기
export const getCurrentTopic = async (): Promise<ICurrentTopicResponse> => {
  const response = await axiosInstance.get<{ data: ICurrentTopicResponse }>(
    "/api/home/topics/current"
  );
  return response.data.data;
};

// 오늘의 질문에 대한 가족 답변
export const getCurrentTopicAnswer = async (): Promise<IGetAnswerReponse[]> => {
  const response = await axiosInstance.get<{ data: IGetAnswerReponse[] }>(
    "/api/home/topics/active/answers"
  );
  return response.data.data;
};

// 답변 목록 API 응답 원본 타입
export interface IGetAnswerReponse {
  answerId: number;
  content: string;
  createdAt: string;
  nickname: string;
  profileUrl: string;
  topicId: number;
  userId: number;
}

// 2. 특정 질문에 대한 답변 목록 가져오기
export const getAnswers = async (
  topicId: number
): Promise<IGetAnswerReponse[]> => {
  const response = await axiosInstance.get<{ data: IGetAnswerReponse[] }>(
    `/api/topics/${topicId}/answers/family`
  );
  return response.data.data || [];
};

// 3. 답변 등록하기
export const answerCurrentTopic = async (topicId: number, content: string) => {
  const response = await axiosInstance.post(`/api/topics/${topicId}/answers`, {
    content,
  });
  return response.data;
};

// 4. 답변 수정하기 본인 것만 가능
export const modifyMyAnswer = async (topicId: number, content: string) => {
  const response = await axiosInstance.patch(`/api/topics/${topicId}/answers`, {
    content,
  });

  //답변 리스트 갱신
  return response.data;
};

export interface IGetPastTopics {
  id: number;
  question: string;
  activeFrom: string;
  activeUntil: string;
}

// 5. 지난 질문 목록 가져오기
export const getPastTopics = async (): Promise<IGetPastTopics[]> => {
  const response = await axiosInstance.get<{
    data: { topics: IGetPastTopics[] };
  }>("/api/topics/family/answered");
  // 데이터가 없을 경우, 기본값으로 빈 topics 배열을 가진 객체를 반환합니다.
  return response.data.data.topics || { topics: [] };
};
