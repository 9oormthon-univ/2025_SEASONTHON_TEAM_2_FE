import { JoinQuestion } from "../../components/onboarding";
import { useNavigate } from "react-router-dom";
import { STEP, type StepValue } from "../../types/onboarding.types";

export default function JoinQuestionPage() {
    const navigate = useNavigate();

    const goToNextStep = (nextStep: StepValue) => {
        switch (nextStep) {
            case STEP.JOIN_PENDING:
                navigate("/auth/on-boarding/join-pending");
                break;
            default:
                navigate("/auth/on-boarding");
        }
    };

    return <JoinQuestion goToNextStep={goToNextStep} />;
}
