import { useMemo } from "react";

export type NotiItem = {
    id: number;
    kind: "약속" | "구성원" | "오늘의 질문";
    text: string;
    category?: "action" | "read";
    link?: string | null;
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
            role="region"
            aria-label="최근 알림"
        >
            <div className="space-y-3">
                {list.length === 0 ? (
                    <div className="text-center text-gray-400 py-6 text-[15px]">
                        알림이 없습니다.
                    </div>
                ) : (
                    list.map((n) => (
                        <div
                            key={n.id}
                            className="rounded-2xl bg-[#EFF1F0] px-3 py-2 cursor-pointer hover:bg-[#E4E8E6] transition"
                        >
                            <div className="text-[#A1ADA1] text-[14px] font-pretendard mb-1">
                                {n.kind} 알림
                            </div>
                            <div className="text-[#353535] text-[16px] font-pretendard truncate">
                                {n.text}
                            </div>
                        </div>
                    ))
                )}

                {items.length > list.length && (
                    <div className="pt-1 text-center text-[#7F8C85] text-[16px] font-pretendard">
                        ···
                    </div>
                )}
            </div>
        </div>
    );
}
