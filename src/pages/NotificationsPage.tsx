import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MainHeader from "../components/MainHeader";
import CustomCalendar from "../components/CustomCalendar";
import bellIcon from "../assets/icons/home/Bell.svg";
import xmarkIcon from "../assets/icons/home/Xmark.svg";

import {
    getUnreadNotifications,
    readAllNotifications,
    readNotificationById,
    mapDtoToNotiItem,
} from "../api/notifications";
import type { NotiItem } from "../api/notifications";

import AppointmentDetailModal from "../components/modal/AppointmentDayDetailModal";
import MemberRequestModal from "../components/modal/MemberRequestModal";
import { updateAppointmentStatus } from "../api/appointments";
import { approvePendingJoin, rejectPendingJoin } from "../api/family";

export default function NotificationsPage() {
    const location = useLocation() as { state?: { items?: NotiItem[] } };
    const initialItems: NotiItem[] = location.state?.items ?? [];
    const [list, setList] = useState<NotiItem[]>(initialItems);

    const [selectedApptId, setSelectedApptId] = useState<number | null>(null);
    const [selectedRequestId, setSelectedRequestId] = useState<number | null>(null);

    useEffect(() => {
        getUnreadNotifications()
            .then((dtos) => {
                console.log("📥 원본 DTO 리스트:", dtos);
                const items = dtos.map(mapDtoToNotiItem);
                console.log("📦 매핑된 NotiItem 리스트:", items);
                setList(items);
            })
            .catch((e) => console.error("알림 불러오기 실패:", e));
    }, []);

    const handleMarkAllRead = async () => {
        try {
            await readAllNotifications();
            setList((prev) => prev.filter((n) => n.category === "action"));
        } catch (e) {
            console.error("모두 읽기 실패", e);
        }
    };

    const handleDismissRead = async (id: number) => {
        try {
            await readNotificationById(id);
            setList((prev) => prev.filter((n) => n.id !== id));
        } catch (e) {
            console.error("알림 읽기(개별) 실패:", e);
        }
    };

    // 약속 액션 처리
    const handleAction = async (
        appointmentId: number,
        status: "ACCEPTED" | "REJECTED",
        notiId?: number
    ) => {
        try {
            await updateAppointmentStatus(appointmentId, status);
            if (notiId) {
                await readNotificationById(notiId);
                setList((prev) => prev.filter((n) => n.id !== notiId));
            }
            setSelectedApptId(null);
        } catch (e) {
            console.error(`알림 ${status} 실패:`, e);
        }
    };

    // 구성원 액션 처리
    const handleMemberAction = async (
        requestId: number,
        status: "APPROVE" | "REJECT",
        notiId?: number
    ) => {
        try {
            if (status === "APPROVE") {
                await approvePendingJoin(requestId);
            } else {
                await rejectPendingJoin(requestId);
            }
            if (notiId) {
                await readNotificationById(notiId);
                setList((prev) => prev.filter((n) => n.id !== notiId));
            }
            setSelectedRequestId(null);
        } catch (e) {
            console.error(`구성원 ${status} 실패:`, e);
        }
    };

    return (
        <div className="relative w-screen h-screen max-w-[1440px] pt-35 m-auto flex items-center justify-center px-14 bg-back-color">
            <MainHeader hasUnread={list.length > 0} disableNotiPopover />

            <main className="grid grid-cols-[1fr_360px] grid-rows-[750px] gap-4 p-10 w-full">
                <section className="bg-white rounded-2xl border border-light-gray p-5 mt-1.5 flex flex-col min-h-0">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <img src={bellIcon} alt="" className="w-8 h-8 ml-6" />
                            <span className="text-[24px] font-kccganpan text-primary-300">
                                알림 목록
                            </span>
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
                                    <div className="flex-1 min-w-0 flex items-center justify-center rounded-[16px] bg-back-color pl-4 pr-3 py-6">
                                        <div className="text-center text-[#7F8C85] text-[22px] font-pretendard">
                                            알림이 없습니다.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            list.map((n) => {
                                const isAction = n.category === "action";

                                return (
                                    <div key={n.id} className="rounded-xl px-5 py-1 bg-transparent">
                                        <div className="flex items-center gap-3">
                                            {/* 알림 내용 + 상세보기 */}
                                            <div className="flex-1 min-w-0 flex items-center gap-3 rounded-[16px] bg-back-color pl-4 pr-3 py-2">
                                                <div className="flex-1 min-w-0 text-[#2A2F2A] text-[21px] font-pretendard truncate">
                                                    <div className="mb-2 text-[#94A69A] text-[17px] font-pretendard">
                                                        {n.kind} 알림
                                                    </div>
                                                    {n.text}
                                                </div>

                                                {isAction && (
                                                    <button
                                                        onClick={() => {
                                                            if (n.kind === "약속" && n.appointmentId) {
                                                                setSelectedApptId(n.appointmentId);
                                                            } else if (n.kind === "구성원" && n.requestId) {
                                                                setSelectedRequestId(n.requestId);
                                                            }
                                                        }}
                                                        className="h-12 px-10 rounded-[16px] bg-primary-200 text-white text-[18px] font-pretendard"
                                                        type="button"
                                                    >
                                                        상세보기
                                                    </button>
                                                )}
                                            </div>

                                            {/* 거절/수락 버튼 (배경 분리) */}
                                            {isAction && (
                                                <>
                                                    <button
                                                        onClick={() => {
                                                            if (n.kind === "약속" && n.appointmentId) {
                                                                handleAction(n.appointmentId, "REJECTED", n.id);
                                                            } else if (n.kind === "구성원" && n.requestId) {
                                                                handleMemberAction(n.requestId, "REJECT", n.id);
                                                            }
                                                        }}
                                                        className="h-20 px-6 rounded-[16px] bg-transparent text-[#D06666] text-[18px] font-pretendard hover:underline"
                                                        type="button"
                                                    >
                                                        거절
                                                    </button>

                                                    <button
                                                        onClick={() => {
                                                            if (n.kind === "약속" && n.appointmentId) {
                                                                handleAction(n.appointmentId, "ACCEPTED", n.id);
                                                            } else if (n.kind === "구성원" && n.requestId) {
                                                                handleMemberAction(n.requestId, "APPROVE", n.id);
                                                            }
                                                        }}
                                                        className="h-20 px-6 rounded-[16px] bg-primary-200 text-white text-[18px] font-pretendard hover:opacity-90"
                                                        type="button"
                                                    >
                                                        수락
                                                    </button>
                                                </>
                                            )}

                                            {/* 읽기 알림 → X 아이콘 */}
                                            {!isAction && (
                                                <button
                                                    onClick={() => handleDismissRead(n.id)}
                                                    className="h-12 w-12 rounded-full flex items-center justify-center hover:bg-[#E4E8E6]"
                                                    type="button"
                                                >
                                                    <img src={xmarkIcon} alt="삭제" className="w-6 h-6" />
                                                </button>
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

            {/* 약속 상세 모달 */}
            {selectedApptId && (
                <AppointmentDetailModal
                    isOpen={!!selectedApptId}
                    appointmentId={selectedApptId}
                    onClose={() => setSelectedApptId(null)}
                    onCancel={(id) => handleAction(id, "REJECTED")}
                    showCancel={false}
                />
            )}

            {/* 구성원 상세 모달  .. 디자인 추후 변경(안되면삭제)*/}
            {selectedRequestId && (
                <MemberRequestModal
                    isOpen={!!selectedRequestId}
                    requestId={selectedRequestId}
                    onClose={() => setSelectedRequestId(null)}
                    onHandled={() => {
                        setList((prev) =>
                            prev.filter((n) => n.requestId !== selectedRequestId)
                        );
                    }}
                />
            )}
        </div>
    );
}
