import MobileNav from "../../components/mobile/MobileNav";
import {useLocation} from "react-router-dom";
import MobileHeader from "../../components/mobile/MobileHeader.tsx";
import LargeBackButton from "../../components/mobile/LargeBackButton.tsx";

export default function MemoPage() {
    const location = useLocation();
    const isLarge = location.state?.isLarge ?? false;

    return (
        <div className="min-h-screen bg-back-color">
            {!isLarge &&
                (
                    <div>
                        <MobileHeader />
                        <MobileNav />
                    </div>
                )}
            {isLarge &&
                (
                    <div className=" px-4 py-20">
                        <MobileHeader isLarge={true} />
                        <LargeBackButton/>
                    </div>
                )}
        </div>
    );
}
