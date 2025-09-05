import { TermsAndConfitions } from "../../components/onboarding";
import { useNavigate, useSearchParams } from "react-router-dom";
import { STEP, type StepValue, type TypeValue } from "../../types/onboarding.types";

export default function TermsPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const type = searchParams.get("type") as TypeValue;

    const goToNextStep = (nextStep: StepValue, type?: TypeValue) => {
        const currentType = type || searchParams.get("type");

        switch (nextStep) {
            case STEP.USER_INFO:
                navigate(`/auth/on-boarding/user-info?type=${currentType}`);
                break;
            case STEP.START:
                navigate("/auth/on-boarding");
                break;
            default:
                navigate("/auth/on-boarding");
        }
    };

    return <TermsAndConfitions goToNextStep={goToNextStep} />;
}
