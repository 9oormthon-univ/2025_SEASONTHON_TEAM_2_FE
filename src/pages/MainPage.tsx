import { EverFlowLogo } from "../assets/icons";
import KakaoSocialBtn from "../components/KakaoSocialBtn";

function MainPage() {
    return (
        <div className="h-screen flex flex-col justify-center items-center gap-16">
            <div className="flex flex-col items-center">
                <img src={EverFlowLogo} alt="everflow_logo" width={351} />
                <p className="text-[#F3AC00] text-4xl font-gangwon">우리가 더 가까워지는 방법, <span className="text-[#83AD83]">에버플로우</span></p>
            </div>
            <KakaoSocialBtn />
        </div>
    )
}
export default MainPage;
