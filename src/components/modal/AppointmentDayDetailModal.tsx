import { useEffect } from "react";
import { createPortal } from "react-dom";
import moment from "moment";


export type AppointmentDetail = {
    id: number;
    title: string;
    dateTime?: string;
    place?: string;
    to?: string;
    from?: string;
    message?: string;
    color?: string;
};

type Props = {
    isOpen: boolean;
    appt: AppointmentDetail | null;
    onClose: () => void;
    onCancel?: (id: number) => void;
};

function Body({ isOpen, appt, onClose, onCancel }: Props) {
    useEffect(() => {
        if (!isOpen) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", onKey);
        return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
    }, [isOpen, onClose]);

    if (!isOpen || !appt) return null;

    const frameBg = appt.color || "#E2F5E4";

    const formatApptDateTime = (s?: string): string => {
        if (!s) return "-";
        const trimmed = s.trim();
        const [datePart, right] = trimmed.split(/\s+/, 2);
        if (!datePart || !right) return s;

        // 일시: "YYYY-MM-DD HH:mm"
        if (right.includes(":")) {
            const m = moment(`${datePart} ${right}`, "YYYY-MM-DD HH:mm", true);
            if (!m.isValid()) return s;
            const hour = m.hour();
            const minute = m.minute();
            const ampm = hour < 12 ? "오전" : "오후";
            const hh12 = ((hour % 12) || 12).toString().padStart(2, "0");
            const mm = minute.toString().padStart(2, "0");
            return `${m.format("YYYY년 MM월 DD일")} ${ampm} ${hh12}:${mm}`;
        }

        // 기간: "YYYY-MM-DD MM-DD"
        const start = moment(datePart, "YYYY-MM-DD", true);
        if (!start.isValid()) return s;
        const [m2, d2] = right.split("-", 2);
        if (!m2 || !d2) return s;
        const mm2 = m2.padStart(2, "0");
        const dd2 = d2.padStart(2, "0");
        return `${start.format("YYYY년 MM월 DD일")} ~ ${mm2}월 ${dd2}일`;
    };



    return (
        <div
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-[1px] flex items-center justify-center p-4 sm:p-6"
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
            role="dialog" aria-modal="true" aria-label="약속 상세"
        >
            <div className="relative w-full max-w-[700px]">

                <div className="relative p-3" style={{ backgroundColor: frameBg }}>
                    <div className="bg-white shadow-2xl max-h-[85vh] overflow-hidden flex flex-col">

                        <div className="px-6 pt-6 pb-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                {/* 달력 아이콘 */}
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <rect x="3" y="4" width="18" height="18" rx="3" stroke="#7CB342" strokeWidth="2"/>
                                    <path d="M3 9H21" stroke="#7CB342" strokeWidth="2"/>
                                    <path d="M8 2V6M16 2V6" stroke="#7CB342" strokeWidth="2" />
                                </svg>
                                <h2 className="font-kccganpan text-[18px] md:text-[20px] text-black">
                                    {appt.title}
                                </h2>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => onCancel?.(appt.id)}
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
                            <div className="bg-[#EBEDF0] px-4 py-3">
                                <span className="text-black"> 일시 : </span>
                                <span className="text-black">{formatApptDateTime(appt.dateTime)}</span>
                            </div>
                            <div className="bg-[#EBEDF0] px-4 py-3">
                                <span className="text-black"> 장소 : </span>
                                <span className="text-black">{appt.place || "-"}</span>
                            </div>
                        </div>

                        <div className="px-6 pb-6 font-pretendard">
                            <div className="bg-[#EBEDF0] p-5 md:p-6">
                                <p className="font-kccganpan text-[20px] mb-3 ">To. {appt.to || "가족"}</p>
                                <div className="relative h-[144px] overflow-hidden">
                                    <div
                                        className="absolute inset-0 pointer-events-none"
                                        style={{
                                            backgroundImage: `repeating-linear-gradient(
        to bottom,
        transparent 0,
        transparent 47px,  /* 줄 간격 1px */
        #B1B8C0 47px,      /* 줄 색 시작 */
        #B1B8C0 48px       /* 줄 두께 1px */
      )`,
                                        }}
                                    />
                                    <div className="relative px-4 py-1 text-[35px] font-gangwon leading-[48px] whitespace-pre-line">
                                        {appt.message || "작성된 메시지가 없습니다."}
                                    </div>
                                </div>
                                <p className="mt-3 text-right font-kccganpan text-[20px]">From. {appt.from || "나"}</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default function AppointmentDetailModal(props: Props) {
    if (typeof window === "undefined") return null;
    return createPortal(<Body {...props} />, document.body);
}
