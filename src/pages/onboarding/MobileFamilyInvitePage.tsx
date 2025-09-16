import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileHeader from "../../components/mobile/MobileHeader.tsx";

export default function MobileFamilyInvitePage() {
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();

    const isFormValid = answer.trim() !== "";

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isFormValid) {
            console.log("가족 검증 답변:", answer);
            navigate("/home");
        }
    };

    return (
        <div className="w-full min-h-screen max-w-[430px] mx-auto bg-white flex flex-col">
            <MobileHeader />

            <div className="flex-1 px-6 pt-10">
                <h2 className="text-center text-[25px] font-semibold mb-14 mt-20">
                    가족 확인 단계
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                    <div>
                        <label
                            htmlFor="question"
                            className="block mb-3 text-[22px] font-medium text-black"
                        >
                            가족 검증 질문
                        </label>
                        <div className="items-center">
                            <textarea
                                id="question"
                                value="Q. 질문질문 "
                                disabled
                                className="w-full rounded-2xl bg-back-color px-4 py-3 mb-7 text-[22px] outline-none resize-none whitespace-normal break-words"
                                rows={2}
                            />

                            <input
                                id="answer"
                                type="text"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                placeholder="A. 대답"
                                className="w-full rounded-2xl bg-back-color px-4 py-3 text-[22px] outline-none"
                            />
                        </div>
                    </div>
                </form>
            </div>

            {/* 버튼 */}
            <div className="px-6 pb-8">
                <button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={!isFormValid}
                    className={`w-full rounded-2xl text-white text-[20px] font-semibold py-4 mb-10 ${
                        isFormValid
                            ? "bg-primary-200 hover:opacity-90"
                            : "bg-gray-300 cursor-not-allowed"
                    }`}
                >
                    다음
                </button>
            </div>
        </div>
    );
}
