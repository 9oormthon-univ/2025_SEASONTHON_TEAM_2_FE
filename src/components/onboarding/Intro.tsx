import { useState } from "react";
import { STEP, TYPE, type StepProps } from "../../types/onboarding.types";
import { WarningIcon } from "../../assets/icons";

export const Intro: React.FC<StepProps> = ({ goToNextStep }) => {
    const [allowed, setAllowed] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div className="flex min-h-screen flex-col justify-between p-8 sm:p-16 md:p-28">
            <main>
                <div className="mb-8 flex flex-col gap-4">
                    <h1 className="font-kccganpan text-4xl text-primary-300">
                        우리 가족의 대화가 흐르는 곳, Everflow에 오신 걸 환영합니다!
                    </h1>
                    <p className="font-gangwon text-4xl text-primary-200">
                        함께라서 더 소중한, 우리 가족의 이야기를 기록해보세요 :{")"}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <input type="checkbox" className="size-9 rounded border-gray-300" checked={allowed} onChange={() => {
                        setAllowed((prev) => !prev);
                        setIsModalOpen(false);
                    }} />
                    <label className="cursor-pointer font-kccganpan text-xl text-dark-gray" onClick={() => goToNextStep(STEP.TERMS_CONDITIONS)}>
                        <span className="underline">서비스 이용 약관</span> 동의 (필수)
                    </label>
                </div>
                {isModalOpen && (
                    <div className="absolute bg-point-color-orange flex items-center gap-2 p-3 w-[268px] h-[48px] rounded-sm bottom-[36px] left-1/2 -translate-x-1/2 shadow-md">
                        <img src={WarningIcon} />
                        <p className="font-bold text-white">서비스 약관 동의에 체크해주세요.</p>
                    </div>
                )}
            </main>
            <footer className="flex flex-wrap justify-center gap-4 self-center sm:self-end z-50" onClick={() => setIsModalOpen(!allowed)}>
                <button
                    onClick={() => {
                        if (!allowed) return setIsModalOpen(!allowed);
                        goToNextStep(STEP.USER_INFO, TYPE.CREATE);
                    }}
                    className="h-[90px] w-[250px] shrink-0 cursor-pointer rounded-lg border-2 border-primary-300 bg-transparent text-2xl font-semibold transition-colors hover:bg-primary-300 hover:text-white"
                >
                    가족 생성하기
                </button>
                <div className="relative flex flex-col items-center">
                    <div className="absolute -top-16 w-max rounded-lg border border-primary-200 bg-[#ECF5F1] px-5 py-3 shadow-md">
                        <p className="text-sm text-primary-300">가족에게 초대 받으셨나요? 참여하기를 눌러주세요.</p>
                        <div className="absolute -bottom-2 right-4 z-[-1] size-4 rotate-45 border-b border-r border-primary-200 bg-[#ECF5F1]"></div>
                    </div>
                    <button
                        onClick={() => {
                            if (!allowed) return setIsModalOpen(!allowed);
                            goToNextStep(STEP.USER_INFO, TYPE.JOIN);
                        }}
                        className="h-[90px] w-[250px] shrink-0 cursor-pointer rounded-lg bg-primary-200 text-2xl font-semibold text-white transition-opacity hover:opacity-90"
                    >
                        가족 참여하기
                    </button>
                </div>
            </footer>
        </div>
    );
};