import { MagicWand } from "../../assets/icons";
import { STEP, type StepProps } from "../../types/onboarding.types";
import { familyJoinComplete, familyJoinRequest } from "../../api/auth/family";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const JoinQuestion: React.FC<StepProps> = ({ goToNextStep }) => {
    const [searchParams] = useSearchParams();
    const code = searchParams.get("code")!;
    const nickname = searchParams.get("nickname")!;
    const navigate = useNavigate();

    const { data, isLoading } = useQuery({
        queryKey: ['consume-month'],
        queryFn: () => familyJoinRequest(nickname, code)
    });

    const [answer, setAnswer] = useState("");

    const familyJoin = async () => {
        try {
            const json = await familyJoinComplete(code, answer);
            if (json.success) {
                navigate("/home");
            }
            else {
                goToNextStep(STEP.JOIN_PENDING);
            }
        } catch (err) {
            console.log(err.response.data.message);
        }
    }

    const onAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.target.value);
    }

    if (isLoading) {
        return (
            <div className="relative flex min-h-screen w-full flex-col items-center justify-center p-8">
                <main className="w-full max-w-xl">
                    <div className="flex flex-col items-center gap-4 font-kccganpan">
                        <h1 className="mb-2 text-4xl">
                            <span className="text-center text-primary-300 animate-pulse">가족 질문을 불러오고 있어요!</span>
                        </h1>
                    </div>
                </main>
            </div>
        )
    }
    return (
        <div className="relative flex min-h-screen w-full flex-col items-center justify-center p-8">
            <main className="w-full max-w-xl">
                <div className="flex flex-col gap-4 font-kccganpan">
                    <h1 className="mb-2 text-4xl">
                        <span className="text-primary-300">Q. 질문</span> {data?.data.verificationQuestion}
                    </h1>
                    <div>
                        <input
                            id="answer"
                            type="text"
                            placeholder="4명"
                            maxLength={20}
                            value={answer}
                            onChange={onAnswerChange}
                            className="h-[90px] w-full rounded-2xl border border-light-gray bg-white p-5 pl-8 text-2xl text-light-gray"
                        />
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
                        onClick={() => {
                            familyJoin();
                        }}
                        className="h-[90px] w-[250px] shrink-0 rounded-2xl bg-primary-200 text-2xl font-bold text-white transition-colors hover:bg-primary-100"
                    >
                        입장하기
                    </button>
                </div>
            </footer>
        </div>
    );
};