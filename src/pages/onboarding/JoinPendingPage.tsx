import { JoinPending } from "../../components/onboarding";
import { useNavigate } from "react-router-dom";
import { STEP, type StepValue } from "../../types/onboarding.types";

export default function JoinPendingPage() {
    const navigate = useNavigate();

    const goToNextStep = (nextStep: StepValue) => {
        switch (nextStep) {
            case STEP.USER_INFO:
                // 다시 신청하기 - JOIN 타입으로 사용자 정보 입력 페이지로 이동
                navigate("/auth/on-boarding/user-info?type=JOIN");
                break;
            default:
                // 기타 경우에는 홈으로 이동
                navigate("/home");
        }
    };

    return <JoinPending goToNextStep={goToNextStep} />;
}
