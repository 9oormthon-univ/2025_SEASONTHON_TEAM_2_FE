import axiosInstance from "./axiosInstance";

interface ApiResponse<T> {
  data: T;
}

export type MyBookshelfDTO = {
  userId: number;
  nickname: string;
  lastUpdatedAt: string;
  items: { questionId: number; questionText: string; answer?: string }[];
};

export type FamilyMember = {
  userId: number;
  nickname: string;
  profileImageUrl?: string;
};

export const getMyBookshelf = async (): Promise<MyBookshelfDTO> => {
  try {
    const response = await axiosInstance.get<ApiResponse<MyBookshelfDTO>>(
      "/api/bookshelf/me"
    );
    return response.data.data;
  } catch (error) {
    console.error("내 책장 정보를 가져오는 중 오류 발생:", error);
    throw error;
  }
};

export const getBookshelfByUserId = async (
  userId: number
): Promise<MyBookshelfDTO> => {
  try {
    const response = await axiosInstance.get<ApiResponse<MyBookshelfDTO>>(
      `/api/bookshelf/${userId}`
    );
    return response.data.data;
  } catch (error) {
    console.error(
      `사용자(ID: ${userId}) 책장 정보를 가져오는 중 오류 발생:`,
      error
    );
    throw error;
  }
};

export const getFamilyMembers = async (): Promise<FamilyMember[]> => {
  try {
    const response = await axiosInstance.get<ApiResponse<FamilyMember[]>>(
      "/api/family/members"
    );
    return response.data.data ?? [];
  } catch (error) {
    console.error("가족 구성원 목록을 가져오는 중 오류 발생:", error);
    throw error;
  }
};

export type UpdateAnswersDTO = {
  items: { questionId: number; answer: string }[];
};

export const saveAnswersToServer = async ({
  items,
}: UpdateAnswersDTO): Promise<void> => {
  await axiosInstance.patch("/api/bookshelf/bookshelf/me", { items });
};
