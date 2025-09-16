import MobileNav from "../../components/mobile/MobileNav";
import {useLocation} from "react-router-dom";
import MobileHeader from "../../components/mobile/MobileHeader.tsx";
import LargeBackButton from "../../components/mobile/LargeBackButton.tsx";
import MobileMemo from "../../components/mobile/MobileMemo.tsx";

export default function MemoPage() {
    const location = useLocation();
    const isLarge = location.state?.isLarge ?? false;

    return (
        <div className="min-h-screen bg-back-color">

            {!isLarge &&
                (
                    <div>
                        <MobileHeader />
                        <div className="flex flex-col mx-auto w-full max-w-[430px]">
                            <div className="px-4 pt-20">
                                <h2 className="font-semibold text-[20px] py-3">가족 메모장</h2>
                                <div>
                                    <MobileMemo/>
                                </div>

                            </div>
                        </div>
                        <MobileNav />
                    </div>
                )}
            {isLarge &&
                (
                    <div className="px-4 py-6">
                        <MobileHeader isLarge={true} />
                        <div className="mt-15 mx-auto w-full max-w-[430px]">
                            <LargeBackButton/>
                            <div className="mt-10">
                                <h2 className="font-semibold text-[25px] text-[#A4635C] py-3">가족 메모장</h2>
                                <div>
                                    <MobileMemo isLarge={true}/>
                                </div>
                            </div>

                        </div>

                    </div>
                )}
        </div>
    );
}
