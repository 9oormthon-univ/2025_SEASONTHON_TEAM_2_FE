import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Bell from "../../assets/icons/home/Bell.svg";
import BellActive from "../../assets/icons/home/Bell_Active.svg";
import { EverflowHeaderLogo } from "../../assets/icons";
import { getRecentNotifications, mapDtoToNotiItem } from "../../api/notifications";
import type { NotiItem } from "../../api/notifications";

type MobileHeaderProps = {
    isLarge?: boolean;
};

export default function MobileHeader({
                                         isLarge = false,
                                     }: MobileHeaderProps) {
    const navigate = useNavigate();

    const [items, setItems] = useState<NotiItem[]>([]);

    useEffect(() => {
        getRecentNotifications()
            .then((dtos) => setItems(dtos.map(mapDtoToNotiItem)))
            .catch(() => setItems([]));
    }, []);

    const hasAny = items.length > 0;
    const bellIcon = hasAny ? BellActive : Bell;

    return (
        <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
            <div className="pt-[env(safe-area-inset-top)]" />
            <div className="h-14 max-h-14 flex items-center justify-between px-4">
                <img src={EverflowHeaderLogo} alt="EVF" className="h-12 w-auto" />

                {!isLarge && (
                    <button
                        aria-label="알림"
                        onClick={() =>
                            navigate("/mobile/notifications", { state: { items } })
                        }
                        className="rounded-full p-2 active:opacity-80"
                        type="button"
                    >
                        <img src={bellIcon} alt="알림" className="w-7 h-7" />
                    </button>
                )}
            </div>
        </header>
    );
}
