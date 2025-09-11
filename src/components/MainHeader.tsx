import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Bell from "./../assets/icons/home/Bell.svg";
import BellActive from "./../assets/icons/home/Bell_Active.svg";
import { EverflowHeaderLogo } from "./../assets/icons";
import NotificationPopover from "./notifications/NotificationPopover";
import type { NotiItem } from "./notifications/NotificationPopover";
import type { NotiPayload } from "./notifications/type";

type Props = {
    hasUnread?: boolean;
    disableNotiPopover?: boolean;
};

function MyPageModal({
    open,
    onClose,
    avatarUrl,
    onEditNickname,
    onEditProfile,
    onLogout,
}: {
    open: boolean;
    onClose: () => void;
    avatarUrl?: string;
    onEditNickname?: () => void;
    onEditProfile?: () => void;
    onLogout?: () => void;
}) {
    if (!open) return null;
    const handleNickname = () => (onEditNickname ? onEditNickname() : console.log("닉네임 수정"));
    const handleProfile = () => (onEditProfile ? onEditProfile() : console.log("프로필 수정"));
    const handleLogout = () => (onLogout ? onLogout() : console.log("로그아웃"));
    return (
        <div className="fixed inset-0 z-[999]">
            <div className="absolute inset-0 bg-black/60" onClick={onClose} />
            <div className="absolute left-1/2 top-1/2 w-[560px] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white shadow-2xl p-6">
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-xl font-semibold">마이페이지</h2>
                    <button onClick={onClose} className="h-9 px-4 rounded-xl bg-[#EFF2EF] text-[#2A2F2A]" type="button">
                        닫기
                    </button>
                </div>

                <div className="flex items-center gap-4 mb-6">
                    <div className="h-20 w-20 rounded-full overflow-hidden bg-[#D9D9D9]">
                        {avatarUrl ? <img src={avatarUrl} alt="프로필" className="w-full h-full object-cover" /> : null}
                    </div>
                    <div className="text-sm text-[#7A7A7A]">계정 정보를 관리할 수 있어요.</div>
                </div>

                <div className="flex items-center justify-end gap-2">
                    <button onClick={handleNickname} className="h-9 px-3 rounded-lg bg-[#EFF2EF] text-[#2A2F2A] text-sm" type="button">
                        닉네임 수정
                    </button>
                    <button onClick={handleProfile} className="h-9 px-3 rounded-lg bg-[#EFF2EF] text-[#2A2F2A] text-sm" type="button">
                        프로필 수정
                    </button>
                    <button onClick={handleLogout} className="h-9 px-3 rounded-lg bg-[#F3D7D7] text-[#D06666] text-sm" type="button">
                        로그아웃
                    </button>
                </div>
            </div>
        </div>
    );
}

type NotificationDTO = {
    notificationId: number;
    notificationType: string;
    contentText: string;
    link?: string;
};

const getRecentNotifications = async (): Promise<NotificationDTO[]> => {
    const response = await axios
        .get<{ data: NotificationDTO[] }>(
            `${import.meta.env.VITE_API_URL}/api/notifications/recent`,
            {
                headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
            }
        )
        .then((res) => res.data);

    return response.data ?? [];
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

    const user_profile = (localStorage.getItem("userInfo")?.split("|") ?? [])[2] ?? "";

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

                    <li>
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

            <MyPageModal open={myOpen} onClose={() => setMyOpen(false)} avatarUrl={user_profile} />
        </>
    );
}
