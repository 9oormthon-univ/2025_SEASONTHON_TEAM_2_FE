import { useNavigate } from "react-router-dom";
import MobileHeader from "../../components/mobile/MobileHeader.tsx";

export default function MobileJoinPending() {
    const navigate = useNavigate();

    return (
        <div className="w-full min-h-screen max-w-[430px] mx-auto bg-white flex flex-col">
            <MobileHeader isLarge={true}/>

            {/* 메인 콘텐츠 */}
            <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
                <h2 className="text-[25px] font-semibold mb-6">
                    가족 가입 대기중이에요.
                </h2>
                <p className="text-[18px] text-gray-700 leading-relaxed">
                    가족 그룹장이 수락 즉시 가족에 소속됩니다.
                    <br />
                    만약 잘못 요청하셨다면, <br/> 아래{" "}
                    <span className="font-semibold text-primary-300">
                        다시 신청하기
                    </span>{" "}
                    버튼을 눌러주세요.
                </p>
            </div>

            {/* 버튼 - 하단 고정 */}
            <div className="px-6 pb-8">
                <button
                    type="button"
                    onClick={() => navigate("/mobile/family-invite")}
                    className="w-full rounded-2xl bg-primary-200 text-white text-[20px] font-semibold py-4 mb-10 hover:opacity-90"
                >
                    다시 신청하기
                </button>
            </div>
        </div>
    );
}
