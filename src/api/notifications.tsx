import axios from "axios";

export interface NotificationDTO {
    notificationId: number;
    notificationType: string;
    contentText: string;
    link?: string;
}

export const getRecentNotifications = async (): Promise<NotificationDTO[]> => {
    const response = await axios
        .get<{ data: NotificationDTO[] }>(
            `${import.meta.env.VITE_API_URL}/api/notifications/recent`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            }
        )
        .then((res) => res.data);

    return response.data ?? [];
};

export const getUnreadNotifications = async (): Promise<NotificationDTO[]> => {
    const response = await axios
        .get<{ data: NotificationDTO[] }>(
            `${import.meta.env.VITE_API_URL}/api/notifications`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            }
        )
        .then((res) => res.data);

    return response.data ?? [];
};