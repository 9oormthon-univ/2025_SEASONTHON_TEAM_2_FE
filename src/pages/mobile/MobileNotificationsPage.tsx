import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import MobileNav from "../../components/mobile/MobileNav";
import MobileHeader from "../../components/mobile/MobileHeader";
import LargeBackButton from "../../components/mobile/LargeBackButton";

import axiosInstance from "../../api/axiosInstance";
import type { NotiItem } from "../../components/notifications/NotificationPopover";
import MobileAppointmentModal from "../../components/mobile/MobileAppiontmentModal";

import xmarkIcon from "../../assets/icons/home/Xmark.svg";

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

const mapCategory = (t: string, content?: string): NotiItem["category"] => {
    if (t.includes("APPOINTMENT") || t.includes("APPT") || t.includes("약속")) {
        if (content?.includes("신청")) {
            return "action";
        }
        return "read";
    }

    if (t.includes("MEMBER") || t.includes("구성원")) {
        if (content?.includes("가입 요청") || content?.includes("승인 요청")) {
            return "action";
        }
        return "read";
    }

    return "read";
};

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
                        category: mapCategory(dto.notificationType, dto.contentText),
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
                            <h2 className="font-semibold text-[20px] text-center py-3">알림 목록</h2>
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
                                                    className="h-12 w-12 rounded-full flex items-center justify-center hover:bg-[#E4E8E6]"
                                                    type="button"
                                                >
                                                    <img src={xmarkIcon} alt="삭제" className="w-6 h-6" />
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
                            isLarge={isLarge}
                        />
                    )}
                </div>
            )}

            {isLarge && (
                <div className="px-4 py-6">
                    <div className="mt-15 mx-auto w-full max-w-[430px]">
                        <MobileHeader isLarge={true} />
                        <LargeBackButton />
                        <h2 className="font-semibold text-center text-[#49684A] text-[25px] py-3 mt-10">알림 목록</h2>

                        <div className="flex flex-col gap-4">
                            {list.length === 0 ? (
                                <div className="rounded-2xl border-[3px] border-[#CAE5CA] bg-white p-6 text-center text-[#7F8C85] text-[20px]">
                                    알림이 없습니다.
                                </div>
                            ) : (
                                list.map((n) => {
                                    if (n.kind === "약속" && n.appointmentId) {
                                        return (
                                            <div
                                                key={n.id}
                                                className="rounded-2xl border-[5px] border-[#CAE5CA] bg-white px-6 py-5 flex items-center justify-between">
                                                <p className="text-[22px] text-[#2A2F2A] truncate">{n.text}</p>
                                                {/*나중에 확인해야됨!*/}
                                                <button
                                                    onClick={() => setSelectedAppt(n)}
                                                    className="h-11 w-35 px-5 text-center rounded-xl bg-primary-200 text-white text-[20px] font-pretendard">
                                                    상세보기
                                                </button>
                                            </div>
                                        );
                                    }

                                    if (n.category === "read") {
                                        return (
                                            <div
                                                key={n.id}
                                                className="rounded-2xl border-[5px] border-[#CAE5CA] bg-white px-6 py-5 flex items-center justify-between text-[#7F8C85] text-[22px]"
                                            >
                                                <span className="truncate">{n.text}</span>
                                                <button
                                                    onClick={() => removeNotification(n.id)}
                                                    className="h-12 w-12 rounded-full flex items-center justify-center hover:bg-[#E4E8E6]"
                                                    type="button"
                                                >
                                                    <img src={xmarkIcon} alt="삭제" className="w-6 h-6" />
                                                </button>
                                            </div>
                                        );
                                    }

                                    return (
                                        <div
                                            key={n.id}
                                            className="rounded-2xl border-[5px] border-[#CAE5CA] bg-white px-6 py-5 text-[#7F8C85] text-[22px]"
                                        >
                                            모바일로 확인할 수 없어요
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>

                    {selectedAppt && selectedAppt.appointmentId && (
                        <MobileAppointmentModal
                            noti={selectedAppt}
                            onClose={() => setSelectedAppt(null)}
                            onHandled={(id) => {
                                setList((prev) => prev.filter((n) => n.id !== id));
                                setSelectedAppt(null);
                            }}
                            isLarge={isLarge}
                        />
                    )}
                </div>
            )}


        </div>
    );
}
