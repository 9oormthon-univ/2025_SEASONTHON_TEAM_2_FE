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
        mutate: submitAnswer,         // 이 함수를 호출하여 API 요청 실행
        isPending: isSubmitting,      // API 요청이 진행 중인지 여부 (true/false)
        error: submitError            // API 요청 실패 시 에러 객체
    } = useMutation({
        mutationFn: () => familyJoinComplete(code!, answer),
        onSuccess: (data) => {
            // API 호출이 성공했을 때의 로직
            if (data.success) {
                navigate("/home"); // 답변이 맞았을 경우 홈으로 이동
            } else {
                goToNextStep(STEP.JOIN_PENDING);
            }
        },
    });

    const handleAnswerSubmit = () => {
        if (!answer.trim()) return;
        submitAnswer();
    };

    if (isQuestionError) {
        return (
            <div className="relative flex min-h-screen w-full flex-col items-center justify-center p-8">
                <main className="w-full max-w-xl">
                    <div className="flex flex-col items-center gap-4 font-kccganpan">
                        <div className="text-4xl text-center flex flex-col gap-2">
                            <span className="text-center text-nowrap text-point-color-orange">가족 검증 질문을 불러오는 데 실패했습니다!</span>
                            <p>브라우저를 새로고침해주세요!</p>
                        </div>
                    </div>
                </main>
            </div>
        )
    }

    if (isQuestionLoading) {
        return (
            <div className="relative flex min-h-screen w-full flex-col items-center justify-center p-8">
                <main className="w-full max-w-xl">
                    <div className="flex flex-col items-center gap-4 font-kccganpan">
                        <h1 className="mb-2 text-4xl">
                            <span className="text-center text-primary-300 animate-pulse">가족 검증 질문을 불러오고 있어요!</span>
                        </h1>
                    </div>
                </main>
            </div>
        )
    }

    return (
        <div className="relative flex min-h-screen w-full flex-col items-center justify-center p-8">
            <main className="w-full max-w-xl">
                <div className="flex flex-col gap-4 font-kccganpan absolute left-32 top-1/4 w-2xl">
                    <div className="mb-2">
                        <p className="text-nowrap text-4xl">
                            <span className="text-primary-300">Q. 질문 : </span>{questionData?.data.verificationQuestion || "우리 가족 구성원은 모두 몇 명 인가요?"}
                        </p>
                    </div>
                    <div>
                        <input
                            id="answer"
                            type="text"
                            placeholder="답변을 작성해주세요."
                            maxLength={20}
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            className="h-[90px] w-full rounded-2xl border border-light-gray bg-white p-5 pl-8 text-2xl text-black"
                        />
                        {submitError && (
                            <p className="mt-2 pl-2 font-gangwon text-2xl font-bold text-red-500">
                                {submitError.message}
                            </p>
                        )}
                    </div>
                </div>
            </main>

            <footer className="absolute bottom-10 w-full max-w-7xl px-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center font-gangwon text-3xl">
                        <img src={MagicWand} className="mr-2 size-6" alt="Magic Wand Icon" />
                        <p>질문을 맞추면 바로 가입되며, 3회 이상 틀리면 가입 대기 상태로 전환됩니다.</p>
                    </div>
                    <button
                        onClick={handleAnswerSubmit}
                        disabled={isSubmitting}
                        className="h-[90px] w-[250px] shrink-0 rounded-2xl bg-primary-200 text-2xl font-bold text-white transition-colors hover:bg-primary-100 disabled:cursor-not-allowed disabled:bg-gray-400"
                    >
                        {isSubmitting ? "확인 중..." : "입장하기"}
                    </button>
                </div>
            </footer>
        </div>
    );
};