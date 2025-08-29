import { Link } from "react-router-dom";
import Logo from "../assets/EverFlowLogo.svg";
import Kakao_ChatBubble from "../assets/kakao_chatbubble.svg";

function MainPage() {
    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center gap-16">
            <div className="flex flex-col items-center">
                <img src={Logo} />
                <label className="text-primary-500 font-extrabold text-[32px]">우리가 더 가까워지는 방법</label>
            </div>

            <div className="flex flex-col items-center gap-6">
                <div className="bg-[#FEE501] relative flex items-center justify-center  w-[300px] h-[45px] rounded-lg">
                    <img src={Kakao_ChatBubble} className="absolute left-3.5" />
                    <p className="font-semibold text-[15px]">카카오 로그인</p>
                </div>
                <Link to={"/home"} className="font-bold text-sm underline text-dark-gray">그냥 둘러보기</Link>
            </div>
        </div>
    )
}
export default MainPage;
