import { Link } from "react-router-dom";
import HeaderLogo from "../assets/EverflowHeaderLogo.svg";

export default function Header() {
    return (
        <header className="w-screen h-20 shadow-md absolute top-0 left-0 px-[67px] py-[20px] flex items-center justify-between bg-white">
            <Link to={"/"}>
                <img src={HeaderLogo} alt="eveflow_header_logo" />
            </Link>
            {/* 로그인 되어있을 때 활성화 */}
            {/* <div className="">
                <ul className="flex items-center justify-center gap-4 *:bg-dark-gray *:size-16 *:rounded-full text-white text-center">
                    <li>가족책자</li>
                    <li>알람</li>
                    <li>프로필</li>
                </ul>
            </div> */}
        </header>
    )
}