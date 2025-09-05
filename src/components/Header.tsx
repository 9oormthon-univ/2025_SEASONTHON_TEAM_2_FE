import { Link } from "react-router-dom";
import { EverflowHeaderLogo } from "../assets/icons";
import { Bell } from "../assets/icons/home";

export default function Header() {
    const isLoggedIn = localStorage.getItem("userInfo") ? true : false;

    //로컬스토리지에 저장하는 방식 변경 요망
    const [_, __, user_profile] = localStorage.getItem("userInfo")?.split("|") || "";

    return (
        <header className="w-screen max-w-[1440px] h-20 shadow-md z-50 absolute top-0 left-0 px-[67px] py-[20px] flex items-center justify-between bg-white">
            <Link to={"/"}>
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
    )
}