import React, { useEffect, useMemo, useState, useRef } from "react";
import { createPortal } from "react-dom";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import { getMyFamilyMembers } from "../../api/auth/family";
import type { AppointmentPayload } from "../../api/appointments";
import { FailToast } from "../toast/FailToast";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useAuthStore } from "../../store/auth";

export type ColorKey = "green" | "pink" | "orange" | "blue" | "yellow";

export type AppointmentForm = {
    members: number[];
    mode: "single" | "range";
    date: string;
    time: string;
    startDate: string;
    endDate: string;
    title: string;
    location: string;
    color: ColorKey;
    content: string;
};

type AppointmentModalProps = {
    isOpen: boolean;
    defaultDate?: string;
    onClose: () => void;
    onSubmit?: (data: AppointmentPayload) => void;
    familyCandidates?: string[];
};

const COLOR_TOKEN: Record<ColorKey, string> = {
    green: "#CDECCB",
    pink: "#F8C8D8",
    orange: "#FFD6A5",
    blue: "#BDE0FE",
    yellow: "#FFF3B0",
};

function AppointmentModalBody({
    isOpen,
    defaultDate,
    onClose,
    onSubmit,
}: AppointmentModalProps) {
    const [showAnimation, setShowAnimation] = useState(false);
    const { user } = useAuthStore.getState();

    const today = useMemo(() => moment().format("YYYY-MM-DD"), []);
    const nowForInput = useMemo(() => moment().format("YYYY-MM-DDTHH:mm"), []);
    const titleInputRef = useRef<HTMLInputElement>(null);
    const locationInputRef = useRef<HTMLInputElement>(null);
    const contentTextareaRef = useRef<HTMLTextAreaElement>(null);

    const { data: familyMemebers } = useQuery({
        queryKey: ["my-family-members"],
        queryFn: getMyFamilyMembers
    });

    const [form, setForm] = useState<AppointmentForm>({
        members: [],
        mode: "single",
        date: defaultDate ?? today,
        time: "09:00",
        startDate: moment(defaultDate ?? today).format("YYYY-MM-DDTHH:mm"),
        endDate: moment(defaultDate ?? today).add(1, 'hour').format("YYYY-MM-DDTHH:mm"),
        title: "",
        location: "",
        color: "green",
        content: "",
    });

    useEffect(() => {
        if (!isOpen) return;

        // 모달이 열릴 때마다 애니메이션 상태 초기화
        setShowAnimation(false);

        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const d = defaultDate ?? today;
        const startDateTime = moment(d).format("YYYY-MM-DDTHH:mm");
        const endDateTime = moment(d).add(1, 'hour').format("YYYY-MM-DDTHH:mm");

        setForm((p) => ({
            ...p,
            date: d,
            time: "09:00",
            startDate: startDateTime,
            endDate: endDateTime,
            members: [],
            title: "",
            location: "",
            content: ""
        }));
        return () => { document.body.style.overflow = prev; };
    }, [isOpen, defaultDate, today]);

    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const toggleMember = (id: number) =>
        setForm((p) =>
            p.members.includes(id)
                ? { ...p, members: p.members.filter((m) => m !== id) }
                : { ...p, members: [...p.members, id] }
        );

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (form.members.length === 0) {
            FailToast("가족 구성원을 1명 이상 선택해주세요.");
            return;
        }
        if (!form.title.trim()) {
            FailToast("약속 이름을 입력해주세요.");
            titleInputRef.current?.focus();
            return;
        }
        if (!form.location.trim()) {
            FailToast("약속 장소를 입력해주세요.");
            locationInputRef.current?.focus();
            return;
        }
        if (!form.content.trim()) {
            FailToast("편지 내용을 작성해주세요.");
            contentTextareaRef.current?.focus();
            return;
        }

        const now = moment();
        let startTime: string;
        let endTime: string;
        const serverFormat = 'YYYY-MM-DD HH:mm';

        if (form.mode === 'single') {
            const selectedDateTime = moment(`${form.date} ${form.time}`);
            if (!selectedDateTime.isAfter(now)) {
                FailToast("약속 날짜는 현재 시간보다 이후로 설정해야 합니다.");
                return;
            }
            const dateTime = selectedDateTime.format(serverFormat);
            startTime = dateTime;
            endTime = dateTime;

        } else {
            const selectedStartDate = moment(form.startDate);
            const selectedEndDate = moment(form.endDate);

            if (!selectedStartDate.isAfter(now)) {
                FailToast("약속 시작 시간은 현재 시간보다 이후여야 합니다.");
                return;
            }
            if (selectedStartDate.isAfter(selectedEndDate)) {
                FailToast("시작 시간은 종료 시간보다 이전이어야 합니다.");
                return;
            }

            startTime = selectedStartDate.format(serverFormat);
            endTime = selectedEndDate.format(serverFormat);
        }

        const serverData: AppointmentPayload = {
            name: form.title,
            content: form.content,
            location: form.location,
            startTime,
            endTime,
            color: form.color.toUpperCase(),
            participantUserIds: form.members,
        };

        onSubmit?.(serverData);

        // 애니메이션 표시 및 모달 닫기 로직
        setShowAnimation(true); // 애니메이션 보이기

        // 3초 후에 전체 모달 닫기
        setTimeout(() => {
            onClose();
        }, 3000);
    };

    return (
        <div
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-[1px] p-4 sm:p-6 flex justify-center"
            onClick={(e) => { if (e.target === e.currentTarget && !showAnimation) onClose(); }}
            role="dialog"
            aria-modal="true"
            aria-label="약속 만들기"
        >
            {/* 폼 부분 (애니메이션 중에는 숨김) */}
            {!showAnimation && (
                <div className="relative w-full max-w-[943px] pl-10 h-[780px]">
                    <div
                        className="relative p-3"
                        style={{ backgroundColor: COLOR_TOKEN[form.color] }}
                    >
                        <div className="bg-white max-h-[85vh] overflow-hidden flex flex-col">
                            <div className="px-6 pt-6">
                                <h2 className="font-kccganpan text-[18px] mb-4">
                                    가족 구성원 중 약속을 신청할 사람을 선택해주세요.
                                </h2>
                                <div className="flex items-center gap-5 mb-4">
                                    {familyMemebers?.members.filter((member) => member.id !== user?.userId).map((member) => {
                                        const selectMember = form.members.includes(member.id);
                                        return (
                                            <button
                                                key={member.id}
                                                onClick={() => toggleMember(member.id)}
                                                className="flex flex-col items-center gap-2 focus:outline-none"
                                            >
                                                <div
                                                    style={{
                                                        backgroundImage: `url(${member.profileUrl})`
                                                    }}
                                                    className={`w-12 h-12 rounded-full flex items-center bg-center bg-cover justify-center ${selectMember ? "opacity-70" : "opacity-100 "}`}
                                                >
                                                    {selectMember && (
                                                        <span className="inline-block w-6 h-6 rounded-full bg-primary-200 text-white text-center">
                                                            ✓
                                                        </span>
                                                    )}
                                                </div>
                                                <span className={`text-[14px] font-pretendard ${selectMember ? "text-primary-200" : "text-[#6B7280]"}`}>
                                                    {member.nickname}
                                                </span>
                                            </button>
                                        )
                                    })}
                                </div>
                                <div className="font-kccganpan text-[18px] mb-4">약속 날짜와 시간을 정해주세요</div>
                                <div className="flex items-center gap-4 mb-3 font-pretendard">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="mode"
                                            checked={form.mode === "single"}
                                            onChange={() => setForm((p) => ({ ...p, mode: "single" }))}
                                        />
                                        <span>일시</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="mode"
                                            checked={form.mode === "range"}
                                            onChange={() => setForm((p) => ({ ...p, mode: "range" }))}
                                        />
                                        <span>기간</span>
                                    </label>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto px-6 pb-4 font-pretendard">
                                {form.mode === "single" ? (
                                    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3 mb-5">
                                        <input
                                            type="date"
                                            value={form.date}
                                            min={today}
                                            onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
                                            className="h-11 px-3 rounded-2xl font-pretendard border border-light-gray bg-[#FFFCFA]"
                                        />
                                        <input
                                            type="time"
                                            value={form.time}
                                            onChange={(e) => setForm((p) => ({ ...p, time: e.target.value }))}
                                            className="h-11 px-3 rounded-2xl font-pretendard border border-light-gray md:w-40 bg-[#FFFCFA]"
                                        />
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
                                        <input
                                            type="datetime-local"
                                            value={form.startDate}
                                            min={nowForInput}
                                            onChange={(e) => {
                                                const newStartDate = e.target.value;
                                                if (moment(newStartDate).isAfter(form.endDate)) {
                                                    setForm((p) => ({ ...p, startDate: newStartDate, endDate: newStartDate }));
                                                } else {
                                                    setForm((p) => ({ ...p, startDate: newStartDate }));
                                                }
                                            }}
                                            className="h-11 px-3 rounded-2xl font-pretendard border border-light-gray bg-[#FFFCFA]"
                                        />
                                        <input
                                            type="datetime-local"
                                            value={form.endDate}
                                            min={form.startDate}
                                            onChange={(e) => setForm((p) => ({ ...p, endDate: e.target.value }))}
                                            className="h-11 px-3 rounded-2xl font-pretendard border border-light-gray bg-[#FFFCFA]"
                                        />
                                    </div>
                                )}

                                <div className="grid grid-cols-1 gap-4 mb-5 font-pretendard">
                                    <div>
                                        <label className="block mb-3 font-kccganpan text-[18px]">약속 이름</label>
                                        <input
                                            ref={titleInputRef}
                                            placeholder="엄마와 데이트"
                                            value={form.title}
                                            onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                                            className="w-55 h-11 px-3 font-pretendard rounded-2xl border border-light-gray bg-[#FFFCFA]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-3 font-kccganpan text-[18px]">어디서 만나나요?</label>
                                        <input
                                            ref={locationInputRef}
                                            placeholder="서울대공원"
                                            value={form.location}
                                            onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))}
                                            className="w-55 h-11 px-3 font-pretendard rounded-2xl border border-light-gray bg-[#FFFCFA]"
                                        />
                                    </div>
                                </div>

                                <div className="mb-5">
                                    <p className="mb-3 font-kccganpan text-[18px]">편지지 색상을 선택해주세요.</p>
                                    <div className="flex flex-wrap items-center gap-5">
                                        {(Object.keys(COLOR_TOKEN) as ColorKey[]).map((key) => {
                                            const isSel = form.color === key;
                                            return (
                                                <button
                                                    key={key}
                                                    type="button"
                                                    onClick={() => setForm((p) => ({ ...p, color: key }))}
                                                    className="flex flex-col items-center gap-2 focus:outline-none"
                                                >
                                                    <div
                                                        className="w-10 h-10 rounded-full flex items-center justify-center border"
                                                        style={{ backgroundColor: COLOR_TOKEN[key], borderColor: isSel ? "#22C55E" : "#E5E7EB" }}
                                                    >
                                                        {isSel && (
                                                            <span className="inline-block w-6 h-6 rounded-full bg-primary-200 text-white text-center">
                                                                ✓
                                                            </span>
                                                        )}
                                                    </div>
                                                    <span className={`text-sm ${isSel ? "font-pretendard" : ""}`}>
                                                        {key === "green" && "초록"}
                                                        {key === "pink" && "분홍"}
                                                        {key === "orange" && "주황"}
                                                        {key === "blue" && "파랑"}
                                                        {key === "yellow" && "노랑"}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="block mb-3 font-kccganpan text-[18px]">약속 신청 편지를 작성하세요</label>
                                    <textarea
                                        ref={contentTextareaRef}
                                        placeholder="편지 내용을 작성해주세요"
                                        value={form.content}
                                        onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))}
                                        className="w-full min-h-28 p-3 font-gangwon text-[28px] rounded-2xl border border-light-gray bg-[#FFFCFA]"
                                    />
                                </div>
                            </div>

                            <div className="sticky bottom-0 px-6 py-4 flex justify-end">
                                <button
                                    onClick={submit}
                                    className="h-12 px-6 rounded-lg bg-primary-200 text-white font-pretendard flex items-center gap-2 hover:opacity-90"
                                >
                                    보내기
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                        <path d="M3 11L21 3L13 21L11 13L3 11Z" stroke="currentColor" strokeWidth="2" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showAnimation && (
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-fit flex items-center justify-center p-3 z-[101]"
                    style={{ backgroundColor: COLOR_TOKEN[form.color] }}
                >
                    <div className="bg-white flex flex-col items-center justify-center p-5">
                        <DotLottieReact
                            src="/send.lottie"
                            loop
                            autoplay
                        />
                        <p className="font-bold text-5xl font-gangwon">내 마음을 실은 비행기가 전송 중이에요</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function AppointmentModal(props: AppointmentModalProps) {
    if (typeof window === "undefined") return null;
    return createPortal(<AppointmentModalBody {...props} />, document.body);
}