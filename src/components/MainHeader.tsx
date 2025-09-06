import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
                    <button
                        onClick={handleNickname}
                        className="h-9 px-3 rounded-lg bg-[#EFF2EF] text-[#2A2F2A] text-sm"
                        type="button"
                    >
                        닉네임 수정
                    </button>
                    <button
                        onClick={handleProfile}
                        className="h-9 px-3 rounded-lg bg-[#EFF2EF] text-[#2A2F2A] text-sm"
                        type="button"
                    >
                        프로필 수정
                    </button>
                    <button
                        onClick={handleLogout}
                        className="h-9 px-3 rounded-lg bg-[#F3D7D7] text-[#D06666] text-sm"
                        type="button"
                    >
                        로그아웃
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function MainHeader({ hasUnread, disableNotiPopover }: Props) {
    const navigate = useNavigate();
    const [hovering, setHovering] = useState(false);
    const [myOpen, setMyOpen] = useState(false);

    const bellIcon = hasUnread ? BellActive : Bell;
    const user_profile = (localStorage.getItem("userInfo")?.split("|") ?? [])[2] ?? "";

    const notiItems: NotiItem[] = useMemo(
        () => [
            { id: 1, kind: "약속", text: "민서님이 엄마님에게 약속을 신청했어요", category: "action" },
            { id: 2, kind: "약속", text: "아버님이 약속을 수락했어요", category: "read" },
            { id: 3, kind: "구성원", text: "할머니님이 우리 가족에 입장했어요", category: "read" },
            { id: 4, kind: "구성원", text: "함수님이 우리 가족 입장에 대기 중 이에요", category: "read" },
        ],
        []
    );

    const payload: NotiPayload[] = useMemo(
        () => notiItems.map(({ id, kind, text, category }) => ({ id, kind, text, category })),
        [notiItems]
    );

    return (
        <>
            <header className="w-screen max-w-[1440px] h-20 shadow-md z-50 absolute top-0 left-0 px-[67px] py-[20px] flex items-center justify-between bg-white">
                <Link to={"/"}>
                    <img src={EverflowHeaderLogo} alt="eveflow_header_logo" />
                </Link>

                <ul className="flex items-center justify-center gap-4 text-center">
                    <li>
                        <div
                            className="relative"
                            onMouseEnter={() => {
                                if (!disableNotiPopover && hasUnread) setHovering(true);
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
                                <NotificationPopover items={notiItems} visible={!!hasUnread && hovering} />
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
            </header>

            <MyPageModal
                open={myOpen}
                onClose={() => setMyOpen(false)}
                avatarUrl={user_profile}
            />
        </>
    );
}
