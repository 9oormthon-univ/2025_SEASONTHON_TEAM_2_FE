import { MagicWand } from "../../assets/icons";
import { STEP, type StepProps } from "../../types/onboarding.types";
import { familyJoinComplete, familyJoinRequest } from "../../api/auth/family";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const JoinQuestion: React.FC<StepProps> = ({ goToNextStep }) => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const code = searchParams.get("code");
    const nickname = searchParams.get("nickname");

    const { data: questionData, isLoading: isQuestionLoading, isError: isQuestionError } = useQuery({
        queryKey: ['familyJoinQuestion', code],
        queryFn: () => familyJoinRequest(nickname!, code!),
        enabled: !!code && !!nickname,
    });

    const [answer, setAnswer] = useState("");

    const {
        mutate: submitAnswer,
        isPending: isSubmitting,
        error: submitError
    } = useMutation({
        mutationFn: () => familyJoinComplete(code!, answer),
        onSuccess: (data) => {
            if (data.data.status === "INVALID_VERIFICATION_ANSWER") {
                goToNextStep(STEP.JOIN_PENDING);
            } else {
                navigate("/home");
            }
        },
    });

    const handleAnswerSubmit = () => {
        if (!answer.trim()) return;
        submitAnswer();
    };

    if (isQuestionError) {
        return (
            <div className="flex min-h-screen w-full flex-col items-center justify-center p-8">
                <main className="w-full max-w-[1000px] mx-auto">
                    <div className="flex flex-col items-center gap-4 font-kccganpan text-4xl text-center">
                        <span className="text-point-color-orange">
                            가족 검증 질문을 불러오는 데 실패했습니다!
                        </span>
                        <p>브라우저를 새로고침해주세요!</p>
                    </div>
                </main>
            </div>
        );
    }

    if (isQuestionLoading) {
        return (
            <div className="flex min-h-screen w-full flex-col items-center justify-center p-8">
                <main className="w-full max-w-[1000px] mx-auto">
                    <div className="flex flex-col items-center gap-4 font-kccganpan">
                        <h1 className="mb-2 text-4xl">
                            <span className="text-primary-300 animate-pulse">
                                가족 검증 질문을 불러오고 있어요!
                            </span>
                        </h1>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen w-full flex-col items-center p-8">
            <main className="flex flex-col justify-between w-full max-w-[1000px] flex-1 py-20">
                {/* 질문 & 입력 */}
                <div className="flex flex-col gap-6 pt-15">
                    <p className="text-3xl">
                        <span className="text-primary-300 font-kccganpan">Q. 질문 : </span>
                        <span className="font-semibold text-2xl">
                            {questionData?.data.verificationQuestion ||
                                "우리 가족 구성원은 모두 몇 명 인가요?"}
                        </span>
                    </p>

                    <div>
                        <input
                            id="answer"
                            type="text"
                            placeholder="답변을 작성해주세요."
                            maxLength={20}
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            className="h-[80px] w-[600px] rounded-2xl border border-light-gray bg-white p-5 pl-8 text-2xl text-black focus:outline-none"
                        />
                        {submitError && (
                            <p className="mt-2 pl-2 font-gangwon text-2xl font-bold text-red-500">
                                {submitError.message}
                            </p>
                        )}
                    </div>
                </div>

                {/* 안내 + 버튼 */}
                <footer className="mt-16">
                    <div className="flex flex-wrap items-center justify-between gap-6">
                        <div className="flex items-center font-gangwon text-2xl">
                            <img src={MagicWand} className="mr-2 size-6" alt="Magic Wand Icon" />
                            <p>
                                질문을 맞추면 바로 가입되며,{" "}
                                <span className="font-semibold">3회 이상 틀리면</span> 가입 대기 상태로 전환됩니다.
                            </p>
                        </div>
                        <button
                            onClick={handleAnswerSubmit}
                            disabled={isSubmitting}
                            className="h-[80px] w-[250px] shrink-0 rounded-2xl bg-primary-200 text-2xl font-bold text-white transition-colors hover:bg-primary-100 disabled:cursor-not-allowed disabled:bg-gray-400"
                        >
                            {isSubmitting ? "확인 중..." : "입장하기"}
                        </button>
                    </div>
                </footer>
            </main>
        </div>
    );
};
