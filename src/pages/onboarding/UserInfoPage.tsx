import { InputUserInfo } from "../../components/onboarding";
import { useNavigate, useSearchParams } from "react-router-dom";
import { STEP, type StepValue, type TypeValue } from "../../types/onboarding.types";

export default function UserInfoPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const type = searchParams.get("type") as TypeValue;

    const goToNextStep = (nextStep: StepValue, type?: TypeValue) => {
        const currentType = type || searchParams.get("type");

        switch (nextStep) {
            case STEP.CREATE_COMPLETE:
                navigate("/auth/on-boarding/create-complete");
                break;
            case STEP.JOIN_QUESTION:
                navigate(`/auth/on-boarding/join-question?type=${currentType}`);
                break;
            default:
                navigate("/auth/on-boarding");
        }
    };

    return <InputUserInfo goToNextStep={goToNextStep} type={type} />;
}
