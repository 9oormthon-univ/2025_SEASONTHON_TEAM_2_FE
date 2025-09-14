import { useNavigate } from "react-router-dom";
import Bell from "../../assets/icons/home/Bell.svg";
import BellActive from "../../assets/icons/home/Bell_Active.svg";
import { EverflowHeaderLogo } from "../../assets/icons";

// 알림부분은 나중에 수정할거임 (페이지가 아예 달라서)

type MobileHeaderProps = {
    isLarge?: boolean;
    hasUnread?: boolean;
};

export default function MobileHeader({
                                         isLarge = false,
                                         hasUnread = false,
                                     }: MobileHeaderProps) {
    const navigate = useNavigate();

    const computedHasUnread = hasUnread;
    const bellIcon = computedHasUnread ? BellActive : Bell;

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
            <div className="pt-[env(safe-area-inset-top)]" />
            <div className="h-14 max-h-14 flex items-center justify-between px-4">
                <img src={EverflowHeaderLogo} alt="EVF" className="h-12 w-auto" />


                {!isLarge && (
                    <button
                        aria-label="알림"
                        onClick={() => navigate("/notifications")}
                        className="rounded-full p-2 active:opacity-80"
                        type="button"
                    >
                        <img src={bellIcon} alt="" className="w-7 h-7" />
                    </button>
                )}
            </div>
        </header>
    );
}
