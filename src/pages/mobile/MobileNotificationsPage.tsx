import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import MobileNav from "../../components/mobile/MobileNav";
import MobileHeader from "../../components/mobile/MobileHeader";
import LargeBackButton from "../../components/mobile/LargeBackButton";

import axiosInstance from "../../api/axiosInstance";
import type { NotiItem } from "../../components/notifications/NotificationPopover";
import MobileAppointmentModal from "../../components/mobile/MobileAppiontmentModal";

type NotificationDTO = {
    notificationId: number;
    notificationType: string;
    contentText: string;
    link?: string;
};

export type NotiItemWithAppointment = NotiItem & {
    appointmentId: number | null;
};

const getAllNotifications = async (): Promise<NotificationDTO[]> => {
    const res = await axiosInstance.get<{ data: NotificationDTO[] }>("/api/notifications");
    return res.data?.data ?? [];
};

const mapKind = (t: string): NotiItem["kind"] => {
    if (t.includes("약속")) return "약속";
    if (t.includes("질문")) return "오늘의 질문";
    if (t.includes("구성원")) return "구성원";
    return "구성원";
};

const mapCategory = (t: string, link?: string): NotiItem["category"] =>
    t === "APPOINTMENT" || t === "APPT" || !!link ? "action" : "read";

export default function MobileNotificationsPage() {
    const location = useLocation();
    const isLarge = location.state?.isLarge ?? false;

    const [list, setList] = useState<NotiItemWithAppointment[]>([]);
    const [selectedAppt, setSelectedAppt] = useState<NotiItemWithAppointment | null>(null);

    useEffect(() => {
        getAllNotifications()
            .then((dtos) => {
                const mapped: NotiItemWithAppointment[] = dtos.map((dto) => {
                    const kind = mapKind(dto.notificationType);

                    let appointmentId: number | null = null;
                    if (dto.link) {
                        const match = dto.link.match(/\/api\/appointments\/(\d+)/);
                        if (match) {
                            appointmentId = Number(match[1]);
                        }
                    }

                    return {
                        id: dto.notificationId,
                        kind,
                        text: dto.contentText,
                        category: mapCategory(dto.notificationType, dto.link),
                        appointmentId,
                    };
                });

                setList(mapped);
            })
            .catch(() => setList([]));
    }, []);

    const removeNotification = (id: number) => {
        setList((prev) => prev.filter((n) => n.id !== id));
    };

    return (
        <div className="min-h-screen bg-back-color">
            {/* 작은 화면 */}
            {!isLarge && (
                <div>
                    <MobileHeader />
                    <div className="flex flex-col mx-auto w-full max-w-[430px] px-4 pt-20">
                        <div className="flex flex-col gap-3 pb-24">
                            <h2 className="font-semibold text-[20px] py-3">알림</h2>
                            {list.length === 0 ? (
                                <div className="rounded-2xl bg-white p-5 text-center text-[#7F8C85] text-[17px]">
                                    알림이 없습니다.
                                </div>
                            ) : (
                                list.map((n) => {
                                    if (n.kind === "약속" && n.appointmentId) {
                                        // 약속 알림
                                        return (
                                            <div
                                                key={n.id}
                                                className="rounded-2xl bg-white px-4 py-3 flex items-center justify-between"
                                            >
                                                <p className="text-[17px] text-[#2A2F2A] truncate">{n.text}</p>
                                                <button
                                                    onClick={() => setSelectedAppt(n)}
                                                    className="h-9 w-30 px-5 rounded-xl bg-primary-200 text-white text-[17px] font-pretendard"
                                                >
                                                    상세보기
                                                </button>
                                            </div>
                                        );
                                    }

                                    if (n.category === "read") {
                                        // 일반 읽기 알림 → 삭제 버튼 제공
                                        return (
                                            <div
                                                key={n.id}
                                                className="rounded-2xl bg-white px-4 py-3 flex items-center justify-between text-[#7F8C85] text-[17px]"
                                            >
                                                <span className="truncate">{n.text}</span>
                                                <button
                                                    onClick={() => removeNotification(n.id)}
                                                    className="ml-3 text-gray-400 hover:text-red-500 text-[20px] font-bold"
                                                    aria-label="알림 삭제"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        );
                                    }

                                    // 그 외 (action인데 약속이 아닌 것)
                                    return (
                                        <div
                                            key={n.id}
                                            className="rounded-2xl bg-white px-4 py-3 text-[#7F8C85] text-[17px]"
                                        >
                                            모바일로 확인할 수 없어요
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                    <MobileNav />

                    {/* 약속모달 */}
                    {selectedAppt && selectedAppt.appointmentId && (
                        <MobileAppointmentModal
                            noti={selectedAppt}
                            onClose={() => setSelectedAppt(null)}
                            onHandled={(id) => {
                                setList((prev) => prev.filter((n) => n.id !== id));
                                setSelectedAppt(null);
                            }}
                        />
                    )}
                </div>
            )}

            {/* 큰글씨 화면 */}
            {isLarge && (
                <div className="px-4 py-20">
                    <MobileHeader isLarge={true} />
                    <LargeBackButton />
                </div>
            )}
        </div>
    );
}
