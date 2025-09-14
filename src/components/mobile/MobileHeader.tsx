import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Bell from "../../assets/icons/home/Bell.svg";
import BellActive from "../../assets/icons/home/Bell_Active.svg";
import { EverflowHeaderLogo } from "../../assets/icons";
import type { NotiItem } from "../notifications/NotificationPopover";
import type { NotiPayload } from "../notifications/type";
import axiosInstance from "../../api/axiosInstance";

// 알림부분은 나중에 수정할거임 (페이지가 아예 달라서)

type NotificationDTO = {
    notificationId: number;
    notificationType: string;
    contentText: string;
    link?: string;
};

const mapKind = (t: string): NotiItem["kind"] => {
    switch (t) {
        case "APPOINTMENT":
        case "APPT":
            return "약속";
        case "MEMBER":
            return "구성원";
        case "DAILY_QUESTION":
            return "오늘의 질문";
        default:
            return "구성원";
    }
};

const mapCategory = (t: string, link?: string): NotiItem["category"] =>
    t === "APPOINTMENT" || t === "APPT" || !!link ? "action" : "read";

const mapDtoToNotiItem = (dto: NotificationDTO): NotiItem => ({
    id: dto.notificationId,
    kind: mapKind(dto.notificationType),
    text: dto.contentText,
    category: mapCategory(dto.notificationType, dto.link),
});

async function getRecentNotifications(): Promise<NotificationDTO[]> {
    const res = await axiosInstance
        .get<{ data: NotificationDTO[] }>("/api/notification/recent")
        .then((r) => r.data);
    return res.data ?? [];
}

export default function MobileHeader() {
    const navigate = useNavigate();
    const [items, setItems] = useState<NotiItem[]>([]);
    const [hasUnread] = useState<boolean>(true);

    useEffect(() => {
        getRecentNotifications()
            .then((dtos) => setItems(dtos.map(mapDtoToNotiItem)))
            .catch(() => setItems([]));
    }, []);

    const hasAny = items.length > 0;
    const computedHasUnread = hasAny && hasUnread;
    const bellIcon = computedHasUnread ? BellActive : Bell;

    const payload: NotiPayload[] = useMemo(
        () => items.map(({ id, kind, text, category }) => ({ id, kind, text, category })),
        [items]
    );

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
            <div className="pt-[env(safe-area-inset-top)]" />
            <div className="h-14 max-h-14 flex items-center justify-between px-4">
                <img src={EverflowHeaderLogo} alt="EVF" className="h-12 w-auto" />


                <button
                    aria-label="알림"
                    onClick={() => navigate("/mobilenotifications", { state: { items: payload } })}
                    className="rounded-full p-2 active:scale-95 transition"
                    type="button"
                >
                    <img src={bellIcon} alt="알림" className="w-7 h-7" />
                </button>
            </div>
        </header>
    );
}
