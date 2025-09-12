import axiosInstance from "./axiosInstance";

interface ApiResponse<T> {
  data: T;
}

export interface NotificationDTO {
  notificationId: number;
  notificationType: string;
  contentText: string;
  link?: string;
}

export const getRecentNotifications = async (): Promise<NotificationDTO[]> => {
  try {
    const response = await axiosInstance.get<ApiResponse<NotificationDTO[]>>(
      "/api/notifications/recent"
    );
    return response.data.data ?? [];
  } catch (error) {
    console.error("최근 알림 목록을 가져오는 중 오류가 발생했습니다:", error);
    throw error;
  }
};

export const getUnreadNotifications = async (): Promise<NotificationDTO[]> => {
  try {
    const response = await axiosInstance.get<ApiResponse<NotificationDTO[]>>(
      "/api/notifications"
    );
    return response.data.data ?? [];
  } catch (error) {
    console.error(
      "읽지 않은 알림 목록을 가져오는 중 오류가 발생했습니다:",
      error
    );
    throw error;
  }
};
