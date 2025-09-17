import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { STEP, TYPE, type Step1Props } from "../../types/onboarding.types";
import { familyCreate, familyJoinRequest } from '../../api/auth/family';
import { OptionIcon } from '../../assets/icons';
import MobileUserInfoPage from '../../pages/onboarding/MobileUserInfoPage';

interface InputFieldProps {
    id: string;
    label: string;
    placeholder: string;
    maxLength: number;
    helperText: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: 'text' | 'number';
    name: string;
}

const InputField: React.FC<InputFieldProps> = ({ id, label, placeholder, maxLength, helperText, value, onChange, type = 'text', name }) => (
    <div className="flex flex-col gap-4">
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
        type: "text" as const,
        placeholder: "000000",
        maxLength: 6,
        helperText: "가족 초대코드는 6자리 숫자로 이루어져 있어요.",
    },
};

const CreateFamilyFields: React.FC<{
    formData: { verificationQuestion: string; verificationAnswer: string };
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ formData, onChange }) => (
    <section>
        <p className="mb-4 font-kccganpan text-3xl text-primary-200">이어서, 가족 검증 질문을 작성해주세요</p>
        <InputField
            id="verificationQuestion"
            name="verificationQuestion"
            label="Q. 질문"
            placeholder="우리 가족 구성원은 몇 명 인가요?"
            maxLength={20}
            helperText="최대 20자, 추후 수정이 가능해요"
            value={formData.verificationQuestion}
            onChange={onChange}
        />
        <div className="mt-4" />
        <InputField
            id="verificationAnswer"
            name="verificationAnswer"
            label="A. 답변"
            placeholder="4명"
            maxLength={8}
            helperText="최대 8자, 추후 수정이 가능해요"
            value={formData.verificationAnswer}
            onChange={onChange}
        />
    </section>
);


export const InputUserInfo: React.FC<Step1Props> = ({ goToNextStep, type, code }) => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        nickname: '',
        familyNameOrCode: code,
        verificationQuestion: '',
        verificationAnswer: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'familyNameOrCode' && type === TYPE.JOIN) {
            const numericValue = value.replace(/[^0-9]/g, '');
            setFormData(prev => ({ ...prev, [name]: numericValue }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        setError(null);

        try {
            if (type === TYPE.CREATE) {
                await familyCreate(formData);
                goToNextStep(STEP.CREATE_COMPLETE);
            } else { // TYPE.JOIN
                await familyJoinRequest(formData.nickname, formData.familyNameOrCode);
                navigate(`/auth/on-boarding/join-question?code=${formData.familyNameOrCode}&nickname=${formData.nickname}`);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
            console.error("API Error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const currentFamilyConfig = familyInputConfig[type];
    const submitButtonText = type === TYPE.CREATE ? "생성하기" : "다음";

    return (
        <>
            <div className="hidden relative lg:flex min-h-screen w-full flex-col items-center justify-center px-32 py-48">
                <main className="flex w-full max-w-[1440px] flex-wrap justify-center gap-x-24 gap-y-16">
                    {/* 왼쪽 섹션 */}
                    <section className={`
                flex flex-col gap-16 
                ${type === TYPE.JOIN ? 'absolute top-1/4 left-16' : ''}
                `}>
                        <InputField
                            id="nickname"
                            name="nickname"
                            label="먼저 닉네임을 설정해주세요!"
                            placeholder="귀여운막내"
                            maxLength={5}
                            helperText="최대 5글자, 추후 수정이 가능해요."
                            value={formData.nickname}
                            onChange={handleInputChange}
                        />
                        <InputField
                            id="familyNameOrCode"
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

                    {type === TYPE.CREATE && (
                        <CreateFamilyFields
                            formData={formData}
                            onChange={handleInputChange}
                        />
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
                        <div className="flex flex-col items-end">
                            {error && <p className="mb-2 text-red-500 font-bold">{error}</p>}
                            <button
                                onClick={handleSubmit}
                                disabled={isLoading}
                                className="h-[90px] w-[250px] shrink-0 rounded-2xl border-2 border-primary-300 bg-[#ECF5F1] text-2xl font-bold text-primary-300 transition-colors hover:bg-primary-100 disabled:cursor-not-allowed disabled:bg-gray-300"
                            >
                                {isLoading ? '처리 중...' : submitButtonText}
                            </button>
                        </div>
                    </div>
                </footer>
            </div>
            <MobileUserInfoPage />
        </>
    );
};