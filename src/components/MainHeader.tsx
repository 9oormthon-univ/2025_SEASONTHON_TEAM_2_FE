import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Bell from "./../assets/icons/home/Bell.svg";
import BellActive from "./../assets/icons/home/Bell_Active.svg";
import { EverflowHeaderLogo } from "./../assets/icons";
import NotificationPopover from "./notifications/NotificationPopover";
import type { NotiItem } from "./notifications/NotificationPopover";
import type { NotiPayload } from "./notifications/type";
import axiosInstance from "../api/axiosInstance";
import { useAuthStore } from "../store/auth";
import UserProfileModal from "./modal/UserProfileModal";

type Props = {
    hasUnread?: boolean;
    disableNotiPopover?: boolean;
};

type NotificationDTO = {
    notificationId: number;
    notificationType: string;
    contentText: string;
    link?: string;
};

const getRecentNotifications = async (): Promise<NotificationDTO[]> => {
    const res = await axiosInstance.get<{ data: NotificationDTO[] }>('/api/notification/recent').then((r) => r.data);
    return res.data ?? [];
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


export default function MainHeader({ hasUnread, disableNotiPopover }: Props) {
    const navigate = useNavigate();
    const [hovering, setHovering] = useState(false);
    const [myOpen, setMyOpen] = useState(false);
    const [items, setItems] = useState<NotiItem[]>([]);
    const { user } = useAuthStore();
    const user_profile = user?.profileUrl ?? "";

    useEffect(() => {
        getRecentNotifications()
            .then((dtos) => setItems(dtos.map(mapDtoToNotiItem)))
            .catch(() => setItems([]));
    }, []);

    const hasAny = items.length > 0;
    const computedHasUnread = hasAny && (hasUnread ?? true); // ← 알림 0개면 무조건 false
    const bellIcon = computedHasUnread ? BellActive : Bell;

    const payload: NotiPayload[] = useMemo(
        () => items.map(({ id, kind, text, category }) => ({ id, kind, text, category })),
        [items]
    );

    return (
        <>
            <header className="fixed inset-x-0 top-0 z-50 bg-white shadow-md">
                <div className="w-screen h-20 shadow-md z-50 absolute top-0 left-0 px-[67px] py-[20px] flex items-center justify-between bg-white">
                    <Link to={"/home"}>
                        <img src={EverflowHeaderLogo} alt="eveflow_header_logo" />
                    </Link>

                    <ul className="flex items-center justify-center gap-4 text-center">
                        <li>
                            <div
                                className="relative"
                                onMouseEnter={() => {
                                    if (!disableNotiPopover && computedHasUnread) setHovering(true);
                                }}
                                onMouseLeave={() => setHovering(false)}
                            >
                                <button
                                    aria-label="알림"
                                    className="rounded-full p-2 hover:bg-[#F2F4F3] transition"
                                    onClick={() => navigate("/notifications", { state: { items: payload } })}
                                    type="button"
                                >
                                    <img src={bellIcon} alt="알림" className="w-10 h-10" />
                                </button>

                                {!disableNotiPopover && (
                                    <NotificationPopover items={items} visible={!!computedHasUnread && hovering} />
                                )}
                            </div>
                        </li>

                        <li className="flex items-center justify-center">
                            <button
                                aria-label="내 프로필"
                                onClick={() => setMyOpen(true)}
                                type="button"
                                className="size-10 rounded-full overflow-hidden bg-[#D9D9D9] hover:shadow-md transition"
                            >
                                {user_profile ? <img src={user_profile} alt="프로필" className="w-full h-full object-cover" /> : null}
                            </button>
                        </li>
                    </ul>
                </div>
            </header>
            <UserProfileModal
                isOpen={myOpen}
                userInfo={user}
                onClose={() => setMyOpen(prev => !prev)}
            />
        </>
    );
}
