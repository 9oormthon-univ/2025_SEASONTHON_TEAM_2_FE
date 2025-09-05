import React, { useState } from 'react';
import { STEP, TYPE, type Step1Props } from "../../types/onboarding.types";
import { OptionIcon } from '../../assets/icons';

// --- 1. 재사용 UI 컴포넌트: InputField ---
// 반복되는 입력 필드 구조를 하나의 컴포넌트로 분리하여 재사용성과 유지보수성을 높입니다.
interface InputFieldProps {
    id: string;
    label: string;
    placeholder: string;
    maxLength: number;
    helperText: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: 'text' | 'number';
    name: string; // 'name' attribute for state management
}

const InputField: React.FC<InputFieldProps> = ({
    id,
    label,
    placeholder,
    maxLength,
    helperText,
    value,
    onChange,
    type = 'text',
    name
}) => (
    <div className="flex flex-col gap-2">
        <label htmlFor={id} className="pl-2 font-kccganpan text-4xl text-primary-300">
            {label}
        </label>
        <input
            id={id}
            name={name}
            type={type}
            placeholder={placeholder}
            maxLength={maxLength}
            value={value}
            onChange={onChange}
            className="h-[90px] w-[540px] rounded-2xl border border-light-gray bg-white p-5 pl-8 text-2xl text-light-gray"
        />
        <p className="pl-2 font-gangwon text-2xl">{helperText}</p>
    </div>
);


// --- 2. 설정 객체: familyInputConfig ---
// JSX 내부에 복잡하게 얽혀있던 삼항 연산자를 설정 객체로 분리하여 가독성을 높입니다.
const familyInputConfig = {
    [TYPE.CREATE]: {
        label: "가족명을 설정해주세요!",
        type: "text" as const,
        placeholder: "행복한 우리집",
        maxLength: 8,
        helperText: "최대 8글자, 우리 가족에게만 보여지며, 추후 수정이 가능해요.",
    },
    [TYPE.JOIN]: {
        label: "가족 초대 코드를 입력해주세요!",
        type: "number" as const,
        placeholder: "000000",
        maxLength: 6,
        helperText: "가족 초대코드는 6자리 숫자로 이루어져 있어요.",
    },
};

// --- 3. 메인 컴포넌트: InputUserInfo ---
export const InputUserInfo: React.FC<Step1Props> = ({ goToNextStep, type }) => {
    // --- 상태 관리 ---
    // 각 입력값에 대한 상태를 관리하여 제어 컴포넌트로 만듭니다.
    const [formData, setFormData] = useState({
        nickname: '',
        familyNameOrCode: '',
        question: '',
        answer: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // --- 로직 분리 ---
    const nextStep = type === TYPE.CREATE ? STEP.CREATE_COMPLETE : STEP.JOIN_QUESTION;
    const submitButtonText = type === TYPE.CREATE ? "생성하기" : "다음";
    const currentFamilyConfig = familyInputConfig[type];

    return (
        <div className="relative flex min-h-screen w-full flex-col items-center justify-center p-8">
            <main className="flex w-full max-w-[1440px] flex-wrap justify-center gap-x-24 gap-y-16">
                {/* 왼쪽 섹션 */}
                <section className="flex flex-col gap-16">
                    <InputField
                        id="nickname"
                        name="nickname"
                        label="먼저 닉네임을 설정해주세요!"
                        placeholder="귀여운 막내"
                        maxLength={5}
                        helperText="최대 5글자, 추후 수정이 가능해요."
                        value={formData.nickname}
                        onChange={handleInputChange}
                    />
                    <InputField
                        id="homeName"
                        name="familyNameOrCode"
                        label={currentFamilyConfig.label}
                        type={currentFamilyConfig.type}
                        placeholder={currentFamilyConfig.placeholder}
                        maxLength={currentFamilyConfig.maxLength}
                        helperText={currentFamilyConfig.helperText}
                        value={formData.familyNameOrCode}
                        onChange={handleInputChange}
                    />
                </section>

                {/* 오른쪽 섹션 (가족 생성 시) */}
                {type === TYPE.CREATE && (
                    <section>
                        <p className="mb-4 font-kccganpan text-3xl text-primary-200">이어서, 가족 검증 질문을 작성해주세요</p>
                        <InputField
                            id="question"
                            name="question"
                            label="Q. 질문"
                            placeholder="우리 가족 구성원은 몇 명 인가요?"
                            maxLength={20}
                            helperText="최대 20자, 추후 수정이 가능해요"
                            value={formData.question}
                            onChange={handleInputChange}
                        />
                        <div className="mt-4" /> {/* 간격 추가 */}
                        <InputField
                            id="answer"
                            name="answer"
                            label="A. 답변"
                            placeholder="4명"
                            maxLength={20}
                            helperText="최대 20자, 추후 수정이 가능해요"
                            value={formData.answer}
                            onChange={handleInputChange}
                        />
                    </section>
                )}
            </main>

            <footer className="absolute bottom-10 w-full max-w-7xl px-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center">
                        <img src={OptionIcon} className="size-6" alt="옵션 아이콘" />
                        <p className="ml-2 font-gangwon text-3xl">
                            가족명과 가족 검증 질문은 추후 홈화면 &gt; 가족설정에서{" "}
                            <span className="text-point-color-orange">수정할 수 있어요.</span>
                        </p>
                    </div>
                    <button
                        onClick={() => goToNextStep(nextStep)}
                        className="h-[90px] w-[250px] shrink-0 cursor-pointer rounded-2xl border-2 border-primary-300 bg-[#ECF5F1] text-2xl font-bold text-primary-300 transition-colors hover:bg-primary-100"
                    >
                        {submitButtonText}
                    </button>
                </div>
            </footer>
        </div>
    );
};
