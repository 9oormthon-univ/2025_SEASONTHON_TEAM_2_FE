import { Link } from "react-router-dom";
import { EverflowHeaderLogo } from "../assets/icons";
import { Bell } from "../assets/icons/home";
import { useAuthStore } from "../store/auth";
import MobileHeader from "./mobile/MobileHeader";

export default function Header() {
    const { user } = useAuthStore();
    const isLoggedIn = !!user;
    const user_profile = user?.profileUrl ?? "";

    return (
        <>
            <header className="hidden  w-screen max-w-[1440px] h-20 shadow-md z-50 absolute top-0 left-0 px-[67px] py-[20px] lg:flex items-center justify-between bg-white">
                <Link to={"/home"}>
                    <img src={EverflowHeaderLogo} alt="eveflow_header_logo" />
                </Link>
                {/* 로그인 되어있을 때 활성화 */}
                {isLoggedIn && (
                    <div className="">
                        <ul className="flex items-center justify-center gap-4 *:size-12 *:rounded-full text-white text-center">
                            <li>가족책자</li>
                            <li>
                                <img src={Bell} />
                            </li>
                            <li>
                                <img src={user_profile} className="rounded-full" />
                            </li>
                        </ul>
                    </div>
                )}
            </header>
            <MobileHeader />
        </>
    )
}