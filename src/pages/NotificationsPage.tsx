import { useEffect, useState } from "react";
import axios from "axios";
import MainHeader from "../components/MainHeader.tsx";
import CustomCalendar from "../components/CustomCalendar";
import { useLocation } from "react-router-dom";
import type { NotiItem } from "../components/notifications/NotificationPopover";
import bellIcon from "../assets/icons/home/Bell.svg";
import xmarkIcon from "../assets/icons/home/Xmark.svg";

type NotificationDTO = {
    notificationId: number;
    notificationType: string;
    contentText: string;
    link?: string;
};

const getAllUnreadNotifications = async (): Promise<NotificationDTO[]> => {
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

const readAllNotifications = async (): Promise<string | undefined> => {
    const response = await axios
        .patch<{ data?: { message?: string } }>(
            `${import.meta.env.VITE_API_URL}/api/notifications/read-all`,
            null,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            }
        )
        .then((res) => res.data);

    return response.data?.message;
};

const readNotificationById = async (notificationId: number): Promise<string | undefined> => {
    const response = await axios
        .patch<{ data?: { message?: string } }>(
            `${import.meta.env.VITE_API_URL}/api/notifications/${notificationId}/read`,
            null,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            }
        )
        .then((res) => res.data);

    return response.data?.message;
};



const mapKind = (t: string): NotiItem["kind"] =>
    t === "APPOINTMENT" || t === "APPT" ? "약속" : "구성원";

const mapCategory = (t: string, link?: string): NotiItem["category"] =>
    t === "APPOINTMENT" || t === "APPT" || !!link ? "action" : "read";

const mapDtoToNotiItem = (dto: NotificationDTO): NotiItem => ({
    id: dto.notificationId,
    kind: mapKind(dto.notificationType),
    text: dto.contentText,
    category: mapCategory(dto.notificationType, dto.link),
});

export default function NotificationsPage() {
    const location = useLocation() as { state?: { items?: NotiItem[] } };
    const initialItems: NotiItem[] = location.state?.items ?? [];
    const [list, setList] = useState<NotiItem[]>(initialItems);

    useEffect(() => {
        getAllUnreadNotifications()
            .then((dtos) => setList(dtos.map(mapDtoToNotiItem)))
            .catch(() => {});
    }, []);

    const handleMarkAllRead = async () => {
        try {
            await readAllNotifications();
            setList((prev) => prev.filter((n) => n.category === "action")); // UI 동기화
        } catch (e) {
            console.error("모두 읽기 실패", e);
        }
    };


    const handleDismissRead = async (id: number) => {
        try {
            await readNotificationById(id);
            setList((prev) => prev.filter((n) => n.id !== id));  // UI 동기화
        } catch (e) {
            console.error("알림 읽기(개별) 실패:", e);
        }
    };


    return (
        <div className="relative w-screen h-screen max-w-[1440px] pt-20 m-auto flex items-center justify-center px-14 bg-[#EBEDF0]">
            <MainHeader hasUnread={list.length > 0} disableNotiPopover />

            <main className="grid grid-cols-[1fr_360px] grid-rows-[750px] gap-4 p-10 w-full">
                <section className="bg-white rounded-2xl border border-light-gray p-5 flex flex-col min-h-0">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <img src={bellIcon} alt="" className="w-8 h-8 ml-6" />
                            <span className="text-[24px] font-kccganpan text-primary-300">알림 목록</span>
                        </div>
                        <button
                            className="h-8 px-3 rounded-lg text-primary-300 text-[19px] font-semibold font-pretendard mr-5"
                            onClick={handleMarkAllRead}
                            type="button"
                        >
                            모두 읽기
                        </button>
                    </div>

                    <div className="flex-1 min-h-0 overflow-y-auto space-y-3 pr-1">
                        {list.length === 0 ? (
                            <div className="rounded-xl px-5 py-1 bg-transparent">
                                <div className="flex items-center gap-3">
                                    <div className="flex-1 min-w-0 flex items-center justify-center rounded-[16px] bg-[#EFF2EF] pl-4 pr-3 py-6">
                                        <div className="text-center text-[#7F8C85] text-[22px] font-pretendard">알림이 없습니다.</div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            list.map((n) => {
                                const isAction = n.category === "action";

                                return (
                                    <div key={n.id} className="rounded-xl px-5 py-1 bg-transparent">
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 min-w-0 flex items-center gap-3 rounded-[16px] bg-[#EFF2EF] pl-4 pr-3 py-2">
                                                <div className="flex-1 min-w-0 text-[#2A2F2A] text-[21px] font-pretendard truncate">
                                                    <div className="mb-2 text-[#94A69A] text-[17px] font-pretendard">{n.kind} 알림</div>
                                                    {n.text}
                                                </div>

                                                {isAction ? (
                                                    <button
                                                        onClick={() => console.log("상세보기:", n.id)}
                                                        className="h-12 px-12 rounded-[16px] bg-[#93B79A] text-white text-[19px] font-pretendard hover:opacity-90 active:opacity-80 transition shrink-0"
                                                        type="button"
                                                    >
                                                        상세보기
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleDismissRead(n.id)}
                                                        aria-label="읽은 알림 삭제"
                                                        className="h-12 w-12 rounded-full flex items-center justify-center hover:bg-[#E4E8E6] shrink-0"
                                                        type="button"
                                                    >
                                                        <img src={xmarkIcon} alt="삭제" className="w-6 h-6" />
                                                    </button>
                                                )}
                                            </div>

                                            {isAction && (
                                                <>
                                                    <button
                                                        onClick={() => console.log("거절:", n.id)}
                                                        className="h-20 px-7 rounded-[16px] bg-transparent text-[#D06666] text-[20px] font-pretendard hover:underline shrink-0"
                                                        type="button"
                                                    >
                                                        거절
                                                    </button>
                                                    <button
                                                        onClick={() => console.log("수락:", n.id)}
                                                        className="h-20 px-7 rounded-[16px] bg-[#7FAB83] text-white text-[20px] font-pretendard hover:opacity-90 active:opacity-80 transition shrink-0"
                                                        type="button"
                                                    >
                                                        수락
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </section>
                <CustomCalendar />
            </main>
        </div>
    );
}