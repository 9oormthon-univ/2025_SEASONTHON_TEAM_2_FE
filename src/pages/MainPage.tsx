import KakaoSocialBtn from "../components/KakaoSocialBtn";
import { MobileIcon } from "../assets/icons/mobile";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function MainPage() {
    return (
        <div className="min-h-screen w-full bg-back-color flex flex-col justify-center items-center px-2 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                <DotLottieReact
                    src="/main.lottie"
                    loop
                    autoplay
                    className="w-full h-auto object-contain scale-[3] md:scale-[2] lg:scale-[1.5] origin-center"/>
            </div>
            {/* Desktop */}
            <div className="hidden lg:flex flex-col items-center gap-5 w-full max-w-[600px] relative z-10">
                <img src={MobileIcon} alt="everflow_logo" className="w-[230px]" />
                <p className="text-[#F3AC00] text-3xl font-gangwon text-center leading-snug mb-14">
                    세대를 잇는 소통의 흐름,{" "}
                    <span className="text-[#83AD83]">에버플로우</span>
                </p>
                <div className="w-[300px]">
                    <KakaoSocialBtn />
                </div>
            </div>

            {/* Mobile */}
            <div className="flex lg:hidden flex-col items-center gap-8 w-full max-w-[430px] pt-24 pb-16 relative z-10">
                <img src={MobileIcon} alt="everflow_logo" className="w-[200px] mb-4" />
                <div className="w-full max-w-[260px]">
                    <KakaoSocialBtn />
                </div>
            </div>
        </div>
    );
}
export default MainPage;
