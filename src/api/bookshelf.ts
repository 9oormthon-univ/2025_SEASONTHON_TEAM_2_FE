import axios from "axios";

export type MyBookshelfDTO = {
    userId: number;
    nickname: string;
    lastUpdatedAt: string;
    items: { questionId: number; questionText: string; answer?: string }[];
};

export const getMyBookshelf = async (): Promise<MyBookshelfDTO> => {
    const r = await axios
        .get<{ data: MyBookshelfDTO }>(
            `${import.meta.env.VITE_API_URL}/api/bookshelf/me`,
            { headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` } }
        )
        .then(res => res.data);
    return r.data;
};

export const getBookshelfByUserId = async (userId: number): Promise<MyBookshelfDTO> => {
    const r = await axios
        .get<{ data: MyBookshelfDTO }>(
            `${import.meta.env.VITE_API_URL}/api/bookshelf/${userId}`,
            { headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` } }
        )
        .then(res => res.data);
    return r.data;
};

export type FamilyMember = {
    userId: number;
    nickname: string;
    profileImageUrl?: string;
};

export const getFamilyMembers = async (): Promise<FamilyMember[]> => {
    const r = await axios
        .get<{ data: FamilyMember[] }>(
            `${import.meta.env.VITE_API_URL}/api/family/members`,
            { headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` } }
        )
        .then(res => res.data);
    return r.data ?? [];
};
