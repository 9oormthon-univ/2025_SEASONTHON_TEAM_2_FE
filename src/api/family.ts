import axiosInstance from "./axiosInstance.ts";

export interface PendingJoin {
    requestId: number;
    userId: number;
    nickname: string;
    attempts: number;
}

export const getPendingJoins = async (): Promise<PendingJoin[]> => {
    const res = await axiosInstance.get<{ data: PendingJoin[] }>("/family/pending");
    return res.data.data ?? [];
};

// 승인
export const approvePendingJoin = async (requestId: number): Promise<void> => {
    await axiosInstance.post(`/family/pending/${requestId}/approve`);
};

// 거절
export const rejectPendingJoin = async (requestId: number): Promise<void> => {
    await axiosInstance.post(`/family/pending/${requestId}/reject`);
};
