import LargeMobileTodaysQuestion from "../../components/mobile/LargeMobileTodaysQuestion";
import MobileHeader from "../../components/mobile/MobileHeader.tsx";
import LargeBackButton from "../../components/mobile/LargeBackButton.tsx";

export default function LargeTodaysQuestionPage() {

    return (

        <div className="min-h-screen bg-back-color px-4 py-6">
            <MobileHeader isLarge={true}/>
            <div className="mt-15 mx-auto w-full max-w-[430px]">
                <LargeBackButton/>

                <div className="mt-10">
                    <LargeMobileTodaysQuestion />
                </div>

            </div>

        </div>
    );
}
