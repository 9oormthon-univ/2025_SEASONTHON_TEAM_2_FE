import { STEP, type StepProps } from "../../types/onboarding.types";
import MagicWand from "../../assets/MagicWand.svg";

export const JoinQuestion: React.FC<StepProps> = ({ goToNextStep }) => {
    return (
        <div className="relative flex min-h-screen w-full flex-col items-center justify-center p-8">
            <main className="w-full max-w-xl">
                <div className="flex flex-col gap-4 font-kccganpan">
                    <h1 className="mb-2 text-4xl">
                        <span className="text-primary-300">Q. 질문</span> 우리 가족 구성원은 몇 명 인가요?
                    </h1>
                    <div>
                        <input
                            id="answer"
                            type="text"
                            placeholder="4명"
                            maxLength={20}
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
                        onClick={() => goToNextStep(STEP.JOIN_PENDING)}
                        className="h-[90px] w-[250px] shrink-0 cursor-pointer rounded-2xl bg-primary-200 text-2xl font-bold text-white transition-colors hover:bg-primary-100"
                    >
                        입장하기
                    </button>
                </div>
            </footer>
        </div>
    );
};