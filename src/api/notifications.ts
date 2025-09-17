import axiosInstance from "./axiosInstance";

interface ApiResponse<T> {
  data: T;
}

export interface NotificationDTO {
  notificationId: number;
  notificationType: string; // ex) "APPOINTMENT_REQUEST", "APPOINTMENT_ACCEPTED" ...
  contentText: string;       // ex) "OOO님이 약속을 신청했어요", "OOO님이 약속을 수락했어요"
  link?: string;
}

export type NotiKind = "약속" | "구성원" | "오늘의 질문";
export type NotiCategory = "action" | "read";

export type NotiItem = {
  id: number;
  kind: NotiKind;
  text: string;
  category: NotiCategory;
  link?: string;
  appointmentId?: number;
  requestId?: number;
};

/** kind 매핑 */
export const mapKind = (t: string): NotiKind => {
  if (t.includes("APPOINTMENT") || t.includes("APPT") || t.includes("약속")) {
    return "약속";
  }
  if (t.includes("QUESTION") || t.includes("질문")) {
    return "오늘의 질문";
  }
  if (t.includes("MEMBER") || t.includes("구성원")) {
    return "구성원";
  }
  return "구성원";
};

/** category 매핑 */
export const mapCategory = (t: string, content?: string): NotiCategory => {
  // 약속 알림 처리
  if (t.includes("APPOINTMENT") || t.includes("APPT") || t.includes("약속")) {
    // "신청" 들어간 약속 → action
    if (content?.includes("신청")) {
      return "action";
    }
    // "수락/거절" 등 결과 알림 → read
    return "read";
  }

  // 구성원 알림 처리
  if (t.includes("MEMBER") || t.includes("구성원")) {
    if (content?.includes("가입 요청") || content?.includes("승인 요청")) {
      return "action";
    }
    return "read";
  }

  // 기본은 read
  return "read";
};

/** DTO → UI 알림 아이템 매핑 */
export const mapDtoToNotiItem = (dto: NotificationDTO): NotiItem => {
  let appointmentId: number | undefined;
  let requestId: number | undefined;
  let clientLink: string | undefined;

  if (dto.link) {
    if (dto.link.startsWith("/api")) {
      clientLink = dto.link.replace("/api", "");
    } else {
      clientLink = dto.link;
    }

    // 약속 ID 추출
    const apptMatch = dto.link.match(/\/appointments\/(\d+)/);
    if (apptMatch) {
      appointmentId = Number(apptMatch[1]);
    }

    // 구성원 요청 ID 추출 (api 붙은 경우, approve/reject 뒤에 붙은 경우 다 커버)
    const reqMatch = dto.link.match(/(?:\/api)?\/family\/pending\/(\d+)/);
    if (reqMatch) {
      requestId = Number(reqMatch[1]);
    }
  }

  return {
    id: dto.notificationId,
    kind: mapKind(dto.notificationType),
    text: dto.contentText,
    category: mapCategory(dto.notificationType, dto.contentText),
    link: clientLink,
    appointmentId,
    requestId,
  };
};

/** 최근 알림 */
export const getRecentNotifications = async (): Promise<NotificationDTO[]> => {
  const response = await axiosInstance.get<ApiResponse<NotificationDTO[]>>(
      "/api/notifications/recent"
  );
  return response.data.data ?? [];
};

/** 읽지 않은 알림 */
export const getUnreadNotifications = async (): Promise<NotificationDTO[]> => {
  const response = await axiosInstance.get<ApiResponse<NotificationDTO[]>>(
      "/api/notifications"
  );
  return response.data.data ?? [];
};

/** 모두 읽음 처리 */
export const readAllNotifications = async (): Promise<string | undefined> => {
  const response = await axiosInstance.patch<{ message?: string }>(
      "/api/notifications/read-all"
  );
  return response.data?.message;
};

/** 개별 알림 읽음 처리 */
export const readNotificationById = async (
    notificationId: number
): Promise<string | undefined> => {
  const response = await axiosInstance.patch<{ message?: string }>(
      `/api/notifications/${notificationId}/read`
  );
  return response.data?.message;
};
