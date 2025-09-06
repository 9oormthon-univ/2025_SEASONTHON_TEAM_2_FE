import axios from "axios";
import { QuestionAnswer } from "../../types";
import { getUserProfile } from "../user";

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

// API 요청을 위한 기본 axios 인스턴스
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 (토큰 추가)
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 1. 오늘의 질문 가져오기
export const getCurrentTopic = async (): Promise<ICurrentTopicResponse> => {
  const response = await apiClient.get<{ data: ICurrentTopicResponse }>(
    "/api/home/topics/current"
  );
  return response.data.data;
};

// 답변 목록 API 응답 원본 타입
export interface IGetAnswersByID {
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
): Promise<IGetAnswersByID[]> => {
  const response = await apiClient.get<{ data: IGetAnswersByID[] }>(
    `/api/topics/${topicId}/answers`
  );
  return response.data.data || [];
};

// 3. 답변 등록하기
export const answerCurrentTopic = async (topicId: number, content: string) => {
  const response = await apiClient.post(`/api/topics/${topicId}/answers`, {
    content,
  });
  return response.data;
};

// 4. 답변 수정하기 본인 것만 가능
export const deleteAnswer = async (topicId: number, content: string) => {
  const response = await apiClient.patch(`/api/answers/${topicId}`, {
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
  const response = await apiClient.get<{ data: { topics: IGetPastTopics[] } }>(
    "/api/topics/family/answered"
  );
  // 데이터가 없을 경우, 기본값으로 빈 topics 배열을 가진 객체를 반환합니다.
  return response.data.data.topics || { topics: [] };
};

export const isOwn = async (id: number) => {
  const user_id = await getUserProfile(localStorage.getItem("access_token")!);

  return Boolean(user_id === id);
};
