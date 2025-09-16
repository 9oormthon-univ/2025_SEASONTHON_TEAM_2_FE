import { EverFlowLogo } from "../assets/icons";
import KakaoSocialBtn from "../components/KakaoSocialBtn";
import { MobileIcon } from "../assets/icons/mobile";

function MainPage() {
    return (
        <div className="min-h-screen w-full bg-back-color flex flex-col justify-center items-center px-6">
            {/* Desktop */}
            <div className="hidden lg:flex flex-col items-center gap-12 w-full max-w-[600px]">
                <img src={EverFlowLogo} alt="everflow_logo" className="w-[300px] mb-6" />
                <p className="text-[#F3AC00] text-4xl font-gangwon text-center leading-snug mb-10">
                    우리가 더 가까워지는 방법,{" "}
                    <span className="text-[#83AD83]">에버플로우</span>
                </p>
                <div className="w-[300px]">
                    <KakaoSocialBtn />
                </div>
            </div>

            {/* Mobile */}
            <div className="flex lg:hidden flex-col items-center gap-8 w-full max-w-[430px] pt-24 pb-16">
                <img src={MobileIcon} alt="everflow_logo" className="w-[200px] mb-4" />
                {/*<p className="text-[#F3AC00] text-2xl font-gangwon text-center leading-snug mb-8">*/}
                {/*    우리가 더 가까워지는 방법,*/}
                {/*    <br />*/}
                {/*    <span className="text-[#83AD83]">에버플로우</span>*/}
                {/*</p>*/}
                <div className="w-full max-w-[260px]">
                    <KakaoSocialBtn />
                </div>
            </div>
        </div>
    );
}
export default MainPage;
