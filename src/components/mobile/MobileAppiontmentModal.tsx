import { useEffect, useState } from "react";
import {
    getAppointmentDetailById,
    updateAppointmentStatus,
    type AppointmentDetail,
} from "../../api/appointments";
import type { NotiItemWithAppointment } from "../../pages/mobile/MobileNotificationsPage";

export default function MobileAppointmentModal({
                                                   noti,
                                                   onClose,
                                                   onHandled,
                                                   isLarge = false,
                                               }: {
    noti: NotiItemWithAppointment;
    onClose: () => void;
    onHandled: (id: number) => void;
    isLarge?: boolean;
}) {
    const [detail, setDetail] = useState<AppointmentDetail | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!noti.appointmentId) {
            console.error("appointmentId 없음:", noti);
            setLoading(false);
            return;
        }
        getAppointmentDetailById(noti.appointmentId)
            .then(setDetail)
            .catch((err) => console.error("약속 상세 불러오기 실패:", err))
            .finally(() => setLoading(false));
    }, [noti.appointmentId]);

    if (loading) {
        return (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="w-[90%] bg-white rounded-2xl p-6 text-center">
                    불러오는 중...
                </div>
            </div>
        );
    }

    if (!detail) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();}}>
            <div
                className={`w-[90%] bg-white rounded-2xl p-6 relative ${
                    isLarge ? "border-[5px] border-[#CAE5CA]" : ""
                }`}>
                {/* 약속이름 */}
                <h2 className={`font-semibold text-[#49684A] mb-4 ${
                        isLarge ? "text-[28px]" : "text-[20px]"}`}>
                    {detail.appointmentName}
                </h2>

                {/* 상세 내용 */}
                <div className={`space-y-3 text-gray-700 mb-6 ${
                        isLarge ? "text-[20px]" : "text-[16px]"
                    }`}>
                    <p>
                        <span className="font-semibold">To.</span>{" "}
                        {detail.participants?.length > 0
                            ? detail.participants.join(", ")
                            : "없음"}
                    </p>
                    <p>
                        <span className="font-semibold">장소:</span> {detail.location}
                    </p>
                    <p>
                        <span className="font-semibold">시간:</span>{" "}
                        {new Date(detail.startTime).toLocaleDateString()}{" "}
                        {new Date(detail.startTime).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}{" "}
                        ~{" "}
                        {new Date(detail.endTime).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </p>
                    {detail.content && (
                        <p
                            className={`italic text-gray-600 ${
                                isLarge ? "text-[18px]" : "text-[14px]"
                            }`}
                        >
                            “{detail.content}”
                        </p>
                    )}
                    <p>
                        <span className="font-semibold">From.</span>{" "}
                        {detail.proposeUserName}
                    </p>
                </div>

                {/* 수락/거절 버튼 */}
                <div className="flex justify-start gap-3 mt-4">
                    <button
                        onClick={async () => {
                            if (!detail.appointmentId) return;
                            try {
                                await updateAppointmentStatus(
                                    detail.appointmentId,
                                    "REJECTED"
                                );
                                console.log("거절 완료");
                                onHandled(noti.id);
                            } catch (err) {
                                console.error("거절 실패:", err);
                            }
                        }}
                        className={`rounded-xl bg-red-100 text-red-500 ${
                            isLarge
                                ? "h-14 px-8 text-[18px]"
                                : "h-10 px-5 text-[15px]"
                        }`}>
                        거절
                    </button>
                    <button
                        onClick={async () => {
                            if (!detail.appointmentId) return;
                            try {
                                await updateAppointmentStatus(
                                    detail.appointmentId,
                                    "ACCEPTED"
                                );
                                console.log("수락 완료");
                                onHandled(noti.id);
                            } catch (err) {
                                console.error("수락 실패:", err);
                            }
                        }}
                        className={`rounded-xl bg-[#7FAB83] text-white ${
                            isLarge
                                ? "h-14 px-8 text-[18px]"
                                : "h-10 px-5 text-[15px]"
                        }`}>
                        수락
                    </button>
                </div>
            </div>
        </div>
    );
}
