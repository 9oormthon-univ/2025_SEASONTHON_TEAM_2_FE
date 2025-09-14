import { useState } from "react";
import { STEP, type StepProps } from "../../types/onboarding.types";
import { CheckIcon } from "../../assets/icons";

export const JoinPending: React.FC<StepProps> = ({ goToNextStep }) => {
    const [isModalOpen, setModalIsOpen] = useState(false);

    return (
        <div className="relative flex min-h-screen w-full flex-col items-center justify-center p-8">
            <main className="w-full max-w-3xl">
                <div className="flex flex-col gap-2 font-kccganpan">
                    <div className="font-kccganpan text-primary-300 absolute left-32 top-1/4">
                        <h1 className="mb-4 text-4xl">가족 가입 대기중이에요.</h1>
                        <div className="text-2xl text-nowrap">
                            <p>가족 그룹장이 수락 즉시 가족에 소속됩니다.</p>
                            <p>만약 잘못 요청 한 것 같다면, 아래 다시 신청하기 버튼을 눌러 가족 가입을 새로 신청하실 수 있어요.</p>
                        </div>
                    </div>
                </div>
            </main>

            {isModalOpen && (
                <div
                    className="absolute bottom-1/4 left-1/2 flex w-11/12 max-w-2xl -translate-x-1/2 flex-col gap-4 rounded-2xl border-2 border-primary-200 bg-[#ECF5F1] p-6 shadow-lg"
                    onClick={() => setModalIsOpen(false)} // 모달 외부 클릭 시 닫기
                >
                    <div className="flex items-center gap-4">
                        <img src={CheckIcon} alt="Check Icon" />
                        <p className="text-3xl font-bold text-primary-300">현재 가족 수락을 기다리고 있습니다.</p>
                    </div>
                    <div className="font-semibold text-2xl text-[#353535]">
                        <p className="pl-9 text-nowrap">오래 기다려도 수락되지 않는다면? 다음을 확인해주세요.</p>
                        <ul className="ml-12 list-disc">
                            <li>올바른 가족코드를 기입하셨나요?</li>
                            <li>가족의 그룹장에게 수락을 요청해보세요!</li>
                        </ul>
                    </div>
                </div>
            )}

            <footer className="absolute bottom-10 w-full max-w-7xl px-4">
                <div className="flex flex-wrap justify-center gap-4 sm:justify-end">
                    <button
                        onClick={() => setModalIsOpen(true)}
                        className="h-[90px] w-[250px] shrink-0 rounded-2xl border-2 border-primary-200 bg-[#ECF5F1] text-2xl font-bold text-primary-300 transition-colors hover:bg-primary-100"
                    >
                        기다리기
                    </button>
                    <button
                        onClick={() => goToNextStep(STEP.USER_INFO)}
                        className="h-[90px] w-[250px] shrink-0 rounded-2xl bg-primary-200 text-2xl font-bold text-white transition-colors hover:bg-primary-100"
                    >
                        다시 신청하기
                    </button>
                </div>
            </footer>
        </div>
    );
};