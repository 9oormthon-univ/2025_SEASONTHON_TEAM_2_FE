import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import MobileHeader from "../../components/mobile/MobileHeader.tsx";
import { familyJoinComplete, familyJoinRequest } from "../../api/auth/family.ts";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FailToast } from "../../components/toast/FailToast.tsx";

export default function MobileFamilyInvitePage() {
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const code = searchParams.get("code");
    const nickname = searchParams.get("nickname");

    const isFormValid = answer.trim() !== "";

    const { data: questionData, isLoading: isQuestionLoading } = useQuery({
        queryKey: ['familyJoinQuestion', code],
        queryFn: () => familyJoinRequest(nickname!, code!),
        enabled: !!code && !!nickname,
    });

    const {
        mutate: submitAnswer,
        isPending: isSubmitting,
    } = useMutation({
        mutationFn: () => familyJoinComplete(code!, answer),
        onSuccess: (data) => {
            // API 호출이 성공했을 때의 로직
            if (data.data.correct) {
                navigate("/home"); // 답변이 맞았을 경우 홈으로 이동
            }
            else {
                FailToast(data.message);
            }
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isFormValid) {
            submitAnswer();
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
                            <p
                                id="question"
                                className="w-full rounded-2xl bg-back-color px-4 py-3 mb-7 text-[22px] outline-none resize-none whitespace-normal break-words"
                            >
                                {isQuestionLoading
                                    ? "가족 검증 질문 불러오는 중..."
                                    : `Q. ${questionData?.data.verificationQuestion}`
                                }
                            </p>

                            <input
                                id="answer"
                                type="text"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                placeholder="A. 답변"
                                maxLength={8}
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
                    disabled={!isFormValid || isSubmitting}
                    className={`w-full rounded-2xl text-white text-[20px] font-semibold py-4 mb-10 ${isFormValid
                        ? "bg-primary-200 hover:opacity-90"
                        : "bg-gray-300 cursor-not-allowed"
                        }`}
                >
                    {isSubmitting ? "처리 중..." : "다음"}
                </button>
            </div>
        </div>
    );
}
