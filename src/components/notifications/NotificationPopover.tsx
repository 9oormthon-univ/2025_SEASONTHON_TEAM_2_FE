import { useMemo } from "react";

export type NotiItem = {
    id: number;
    kind: "약속" | "구성원" | "오늘의 질문";
    text: string;
    category?: "action" | "read";
    link?: string | null;
    onAccept?: () => void;
    onReject?: () => void;
    cta?: { label: string; onClick: () => void }[];
};

type Props = {
    items: NotiItem[];
    visible: boolean;
};

export default function NotificationPopover({ items, visible }: Props) {
    const list = useMemo(() => items.slice(0, 3), [items]);
    if (!visible) return null;

    return (
        <div
            className="absolute !left-auto !right-0 !top-12 w-[340px] rounded-2xl border border-light-gray bg-white shadow-xl z-[200] p-3 text-left"
            role="region"              // <= dialog 대신 region
            aria-label="최근 알림"
        >
            <div className="space-y-3">
                {list.map((n) => {
                    const isAction = n.category === "action" || !!n.onAccept || !!n.onReject;

                    return (
                        <div key={n.id} className="rounded-2xl bg-[#EFF1F0] px-3 py-2">
                            <div className="text-[#A1ADA1] text-[14px] font-pretendard mb-1">
                                {n.kind} 알림
                            </div>
                            <div className="text-[#353535] text-[16px] font-pretendard">
                                {n.text}
                            </div>

                            {isAction ? (
                                <div className="mt-2 grid grid-cols-2 gap-2 w-full">
                                    <button
                                        onClick={n.onReject ?? (() => {})}
                                        className="h-8 rounded-lg text-[14px] font-pretendard bg-[#F3D7D7] text-[#D06666]"
                                    >
                                        거절
                                    </button>
                                    <button
                                        onClick={n.onAccept ?? (() => {})}
                                        className="h-8 rounded-lg text-[14px] font-pretendard bg-[#93B79A] text-white"
                                    >
                                        수락
                                    </button>
                                </div>
                            ) : (
                                n.cta &&
                                n.cta.length > 0 && (
                                    <div className="mt-2 flex items-center gap-2 justify-end">
                                        {n.cta.map((c, i) => (
                                            <button
                                                key={i}
                                                onClick={c.onClick}
                                                className={`h-8 px-3 rounded-lg text-[14px] font-pretendard ${
                                                    c.label === "거절"
                                                        ? "bg-[#F3D7D7] text-[#D06666]"
                                                        : "bg-primary-200 text-white"
                                                }`}
                                            >
                                                {c.label}
                                            </button>
                                        ))}
                                    </div>
                                )
                            )}
                        </div>
                    );
                })}

                {items.length > list.length && (
                    <div className="pt-1 text-center text-[#7F8C85] text-[16px] font-pretendard">
                        ···
                    </div>
                )}
            </div>
        </div>
    );
}

