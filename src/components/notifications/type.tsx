export type NotiPayload = {
    id: number;
    kind: "약속" | "구성원" | "오늘의 질문";
    text: string;
    category?: "action" | "read";
};
