import { Link } from "react-router-dom";
import { EverflowHeaderLogo } from "../assets/icons";
import { useAuthStore } from "../store/auth";
import MobileHeader from "./mobile/MobileHeader";

export default function Header() {
    const { user } = useAuthStore();
    const isLoggedIn = !!user;

    return (
        <>
            <header className="hidden w-screen h-20 shadow-md z-50 fixed top-0 left-0 px-[67px] py-[20px] lg:flex items-center justify-between bg-white">
                <Link to={"/home"}>
                    <img src={EverflowHeaderLogo} alt="eveflow_header_logo" />
                </Link>
                {/* 로그인 되어있을 때 활성화 */}
                {isLoggedIn && (
                    <div className="">

                    </div>
                )}
            </header>
            <MobileHeader />
        </>
    )
}