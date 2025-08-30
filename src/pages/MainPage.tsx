import { Link } from "react-router-dom";
import Logo from "../assets/EverFlowLogo.svg";
import KakaoSocialBtn from "../components/KakaoSocialBtn";

function MainPage() {
    return (
        <div className="h-screen flex flex-col justify-center items-center gap-16">
            <div className="flex flex-col items-center">
                <img src={Logo} alt="everflow_logo" width={518} />
                <label className="text-primary-500 font-extrabold text-[32px]">우리가 더 가까워지는 방법</label>
            </div>

            <div className="flex flex-col items-center gap-6">
                <KakaoSocialBtn />
                <Link to={"/home"} className="font-bold text-sm underline text-dark-gray">그냥 둘러보기</Link>
            </div>
        </div>
    )
}
export default MainPage;
