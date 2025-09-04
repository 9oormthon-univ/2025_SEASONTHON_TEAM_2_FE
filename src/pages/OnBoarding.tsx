import { useState } from "react";
import { STEP, type StepInfo, type StepValue, type TypeValue } from "../types/onboarding.types";
import { CreateSuccessPage, InputUserInfo, Intro, JoinPending, JoinQuestion, TermsAndConfitions } from "../components/onboarding";

export default function OnBoarding() {
    const [stepInfo, setStepInfo] = useState<StepInfo>({
        step: STEP.START,
        type: "",
    });

    const goToNextStep = (nextStep: StepValue, type?: TypeValue) => {
        setStepInfo({ step: nextStep, type: type || stepInfo.type });
    };

    const renderStepComponent = () => {
        switch (stepInfo.step) {
            case STEP.START:
                //온보딩 홈 화면
                return <Intro goToNextStep={goToNextStep} />;
            case STEP.TERMS_CONDITIONS:
                return <TermsAndConfitions goToNextStep={goToNextStep} />
            case STEP.USER_INFO:
                //유저 정보 입력 & 가족 검증 질문 작성 화면
                return <InputUserInfo goToNextStep={goToNextStep} type={stepInfo.type as TypeValue} />;
            case STEP.CREATE_COMPLETE:
                //가족 생성 완료 시 화면
                return <CreateSuccessPage />;
            case STEP.JOIN_QUESTION:
                //가족 참여 시 가족 검증 질문 작성 화면
                return <JoinQuestion goToNextStep={goToNextStep} />;
            case STEP.JOIN_PENDING:
                //가족 참여 신청 완료 화면
                return <JoinPending goToNextStep={goToNextStep} />;
            default:
                return <div>잘못된 접근입니다.</div>;
        }
    };

    return <>{renderStepComponent()}</>;
}