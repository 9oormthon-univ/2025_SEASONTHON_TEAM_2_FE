import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TYPE, type Step1Props } from "../../types/onboarding.types";
import { familyCreate, familyJoinRequest } from '../../api/auth/family';
import { OptionIconGreen } from "../../assets/icons/home";
import MobileUserInfoPage from '../../pages/onboarding/MobileUserInfoPage';
import { FailToast } from '../toast/FailToast';

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

const InputField: React.FC<InputFieldProps> = ({
                                                   id, label, placeholder, maxLength, helperText, value, onChange, type = 'text', name
                                               }) => (
    <div className="flex flex-col gap-4">
        <label htmlFor={id} className="pl-2 font-kccganpan text-3xl text-primary-300">{label}</label>
        <input
            id={id}
            name={name}
            type={type}
            placeholder={placeholder}
            maxLength={maxLength}
            value={value}
            onChange={onChange}
            className="h-[80px] w-[540px] rounded-2xl border border-light-gray bg-white p-5 text-2xl"
        />
        <p className="pl-2 font-gangwon text-[26px]">{helperText}</p>
    </div>
);

const familyInputConfig = {
    [TYPE.CREATE]: {
        label: "가족명을 설정해주세요!",
        type: "text" as const,
        placeholder: "행복한 우리집",
        maxLength: 8,
        helperText: "최대 8글자, 추후 수정 가능",
    },
    [TYPE.JOIN]: {
        label: "가족 초대 코드를 입력해주세요!",
        type: "text" as const,
        placeholder: "000000",
        maxLength: 6,
        helperText: "가족 초대코드는 6자리 숫자입니다.",
    },
};

export const InputUserInfo: React.FC<Step1Props> = ({ type, code }) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        nickname: '',
        familyName: code ?? '',
        verificationQuestion: '',
        verificationAnswer: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'familyName' && type === TYPE.JOIN) {
            const numericValue = value.replace(/[^0-9]/g, '');
            setFormData(prev => ({ ...prev, [name]: numericValue }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            if (type === TYPE.CREATE) {
                await familyCreate(formData);
                localStorage.setItem("nickname", formData.nickname);
                navigate("/auth/on-boarding/create-complete", { state: { nickname: formData.nickname } });
            } else if (type === TYPE.JOIN) {
                const res = await familyJoinRequest(formData.nickname, formData.familyName);
                navigate(`/auth/on-boarding/join-question`, {
                    state: {
                        code: formData.familyName,
                        nickname: formData.nickname,
                        verificationQuestion: res.data.verificationQuestion,
                    }
                });
            }
        } catch (err) {
            FailToast(err instanceof Error ? err.message : "알 수 없는 오류 발생");
        } finally {
            setIsLoading(false);
        }
    };

    const currentConfig = familyInputConfig[type];
    const submitButtonText = type === TYPE.CREATE ? "생성하기" : "다음";

    return (
        <>
            <div className="hidden lg:flex min-h-screen w-full flex-col items-center justify-center px-12 py-20">
                <main className="w-full max-w-[1000px] flex flex-col gap-12">
                    <section className="flex flex-col gap-10 pt-15">
                        <InputField
                            id="nickname"
                            name="nickname"
                            label="먼저 닉네임을 설정해주세요!"
                            placeholder="귀여운막내"
                            maxLength={5}
                            helperText="최대 5글자, 추후 수정 가능"
                            value={formData.nickname}
                            onChange={handleInputChange}
                        />
                        <InputField
                            id="familyName"
                            name="familyName"
                            label={currentConfig.label}
                            type={currentConfig.type}
                            placeholder={currentConfig.placeholder}
                            maxLength={currentConfig.maxLength}
                            helperText={currentConfig.helperText}
                            value={formData.familyName}
                            onChange={handleInputChange}
                        />
                    </section>
                </main>
                <footer className="w-full max-w-[1000px] mt-12">
                    <div className="flex items-center justify-between gap-6">
                        <div className="flex items-center">
                            <img src={OptionIconGreen} className="size-6" alt="옵션" />
                            <p className="ml-2 font-gangwon text-2xl">
                                가족명과 질문은 추후 홈화면 &gt; 가족설정에서 수정 가능
                            </p>
                        </div>
                        <div className="flex flex-col items-end">
                            <button
                                onClick={handleSubmit}
                                disabled={isLoading || !formData.nickname || !formData.familyName}
                                className="h-[80px] w-[220px] rounded-2xl bg-primary-200 text-xl font-semibold text-white disabled:bg-gray-300"
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
