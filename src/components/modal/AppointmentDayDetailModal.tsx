import { useEffect } from "react";
import { createPortal } from "react-dom";
import moment from "moment";
import type { ColorKey } from "./AppointmentModal";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../LoadingSpinner";
import { getAppointmentDetailById } from "../../api/appointments";

interface AppointmentDetailFromApi {
    appointmentId: number;
    appointmentName: string;
    startTime: string;
    endTime: string;
    location: string;
    content?: string;
    proposeUserName: string;
    color: string;
    participantNum: number;
    participants: string[];
}

export type AppointmentDetail = {
    appointmentId: number;
    appointmentName: string;
    startTime: string;
    endTime: string;
    location: string;
    content: string;
    proposeUserName: string;
    color: ColorKey;
    to: string;
};

type Props = {
    isOpen: boolean;
    id: number | null;
    onClose: () => void;
    onCancel: (id: number) => void;
};

const COLOR_TOKEN: Record<ColorKey, string> = {
    green: "#CDECCB",
    pink: "#F8C8D8",
    orange: "#FFD6A5",
    blue: "#BDE0FE",
    yellow: "#FFF3B0",
};


function Body({ isOpen, id, onClose, onCancel }: Props) {
    const { data: appt, isLoading } = useQuery({
        queryKey: ["appointmentDetail", id],
        queryFn: (): Promise<AppointmentDetailFromApi> => getAppointmentDetailById(id!),
        enabled: !!id,
        select: (dataFromApi) => {
            if (!dataFromApi) return undefined;
            const participantsString = (dataFromApi.participants && Array.isArray(dataFromApi.participants))
                ? dataFromApi.participants.join(', ')
                : dataFromApi.proposeUserName;
            const processedData: AppointmentDetail = {
                ...dataFromApi,
                color: dataFromApi.color.toLowerCase() as ColorKey,
                to: participantsString,
                content: dataFromApi.content || "작성된 메시지가 없습니다.",
            };
            return processedData;
        }
    });

    useEffect(() => {
        if (!isOpen) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", onKey);
        return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
    }, [isOpen, onClose]);

    // --- (수정) 날짜 포맷 함수 로직 변경 ---
    const formatDateTimeRange = (start?: string, end?: string) => {
        if (!start || !end) return "-";
        const startDate = moment(start, "YYYY-MM-DD HH:mm");
        const endDate = moment(end, "YYYY-MM-DD HH:mm");

        // 시작일과 종료일이 같은 날짜인지 확인
        if (startDate.isSame(endDate, 'day')) {
            // 하루 일정: "YYYY년 MM월 DD일 HH시 mm분"
            return startDate.format("YYYY년 MM월 D일 HH시 mm분");
        } else {
            // 여러 날에 걸친 일정: "YYYY년 MM월 DD일 ~ YYYY년 MM월 DD일"
            return `${startDate.format("YYYY년 MM월 DD일")} ~ ${endDate.format("YYYY년 MM월 DD일")}`;
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-[1px] flex items-center justify-center p-4 sm:p-6"
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
            role="dialog" aria-modal="true" aria-label="약속 상세"
        >
            {isLoading && <LoadingSpinner text="상세 정보 로딩 중..." />}

            {!isLoading && appt && (
                <div className="relative w-full max-w-[810px]">
                    <div className="relative p-3" style={{ backgroundColor: COLOR_TOKEN[appt.color] || '#E2F5E4' }}>
                        <div className="bg-white shadow-2xl max-h-[85vh] overflow-hidden flex flex-col">
                            <div className="px-6 pt-6 pb-4 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                        <rect x="3" y="4" width="18" height="18" rx="3" stroke="#7CB342" strokeWidth="2" />
                                        <path d="M3 9H21" stroke="#7CB342" strokeWidth="2" />
                                        <path d="M8 2V6M16 2V6" stroke="#7CB342" strokeWidth="2" />
                                    </svg>
                                    <h2 className="font-kccganpan text-[18px] md:text-[20px] text-black">
                                        {appt.appointmentName}
                                    </h2>
                                </div>

                                <div className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() => onCancel(appt.appointmentId)}
                                        className="text-label-red font-pretendard"
                                    >
                                        약속취소
                                    </button>
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="h-9 px-4 rounded-lg bg-primary-200 text-white font-pretendard hover:opacity-90"
                                    >
                                        닫기
                                    </button>
                                </div>
                            </div>

                            <div className="px-6 pb-4 grid grid-cols-1 md:grid-cols-2 gap-3 font-pretendard">
                                <div className="bg-[#EBEDF0] px-4 py-3 whitespace-nowrap">
                                    <span className="text-black"> 일시 : </span>
                                    <span className="text-black">{formatDateTimeRange(appt.startTime, appt.endTime)}</span>
                                </div>
                                <div className="bg-[#EBEDF0] px-4 py-3">
                                    <span className="text-black"> 장소 : </span>
                                    <span className="text-black">{appt.location || "-"}</span>
                                </div>
                            </div>

                            <div className="px-6 pb-6 font-pretendard">
                                <div className="bg-[#EBEDF0] p-5 md:p-6">
                                    <p className="font-kccganpan text-[20px] mb-3 ">To. {appt.to}</p>
                                    <div className="relative h-[144px] overflow-hidden">
                                        <div
                                            className="absolute inset-0 pointer-events-none"
                                            style={{
                                                backgroundImage: `repeating-linear-gradient(
                                                to bottom,
                                                transparent 0,
                                                transparent 47px,
                                                #B1B8C0 47px,
                                                #B1B8C0 48px
                                                )`,
                                            }}
                                        />
                                        <div className="relative px-4 py-1 text-[35px] font-gangwon leading-[48px] whitespace-pre-line">
                                            {appt.content}
                                        </div>
                                    </div>
                                    <p className="mt-3 text-right font-kccganpan text-[20px]">From. {appt.proposeUserName}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function AppointmentDetailModal(props: Props) {
    if (typeof window === "undefined") return null;
    return createPortal(<Body {...props} />, document.body);
}