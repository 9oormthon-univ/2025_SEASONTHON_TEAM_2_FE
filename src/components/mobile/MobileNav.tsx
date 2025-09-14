import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { HomeIcon, BookIcon, MemoIcon, ProfileIcon } from "../../assets/icons/mobile";

export default function MobileNav() {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        // 입력 요소에 포커스되면 숨기고, 포커스 해제되면 다시 보이게
        const onFocusIn = (e: Event) => {
            const t = e.target as HTMLElement | null;
            if (!t) return;
            const tag = t.tagName.toLowerCase();
            const isEditable =
                tag === "input" ||
                tag === "textarea" ||
                t.getAttribute("contenteditable") === "true";
            if (isEditable) {
                setVisible(false);
            }
        };

        const onFocusOut = () => {
            setVisible(true);
        };

        document.addEventListener("focusin", onFocusIn, true);
        document.addEventListener("focusout", onFocusOut, true);

        return () => {
            document.removeEventListener("focusin", onFocusIn, true);
            document.removeEventListener("focusout", onFocusOut, true);
        };
    }, []);


    if (!visible) return null;

    return (
        <nav className="fixed bottom-0 left-0 w-full">
            <div className="mx-auto w-full max-w-[430px]">
                <div className="rounded-t-2xl bg-white shadow-md px-4 py-3 grid grid-cols-4 gap-2 text-center">
                    <NavLink
                        to="/home"
                        aria-label="Home"
                        className={({ isActive }) =>
                            `flex flex-col items-center ${isActive ? "bg-[#EBEDF0] rounded-xl p-2" : "p-2"}`
                        }
                        end
                    >
                        <img src={HomeIcon} alt="Home" className="h-12 w-12" />
                    </NavLink>

                    <NavLink
                        to="/book"
                        aria-label="Book"
                        className={({ isActive }) =>
                            `flex flex-col items-center ${isActive ? "bg-[#EBEDF0] rounded-xl p-2" : "p-2"}`
                        }
                    >
                        <img src={BookIcon} alt="Book" className="h-12 w-12" />
                    </NavLink>

                    <NavLink
                        to="/memo"
                        aria-label="Memo"
                        className={({ isActive }) =>
                            `flex flex-col items-center ${isActive ? "bg-[#EBEDF0] rounded-xl p-2" : "p-2"}`
                        }
                    >
                        <img src={MemoIcon} alt="Memo" className="h-12 w-12" />
                    </NavLink>

                    <NavLink
                        to="/profile"
                        aria-label="Profile"
                        className={({ isActive }) =>
                            `flex flex-col items-center ${isActive ? "bg-[#EBEDF0] rounded-xl p-2" : "p-2"}`
                        }
                    >
                        <img src={ProfileIcon} alt="Profile" className="h-12 w-12" />
                    </NavLink>
                </div>
            </div>
        </nav>
    );
}
