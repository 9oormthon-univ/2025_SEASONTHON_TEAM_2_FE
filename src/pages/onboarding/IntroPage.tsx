import { Intro } from "../../components/onboarding";
import { useNavigate } from "react-router-dom";
import { STEP, type StepValue, type TypeValue } from "../../types/onboarding.types";
import { useEffect } from "react";

export default function IntroPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const redirectUrl = localStorage.getItem("postLoginRedirect");
        if (redirectUrl) {
            navigate(redirectUrl);
        }
    }, [navigate]);

    const goToNextStep = (nextStep: StepValue, type?: TypeValue) => {
        switch (nextStep) {
            case STEP.TERMS_CONDITIONS:
                navigate(`/auth/on-boarding/terms`);
                break;
            case STEP.USER_INFO:
                navigate(`/auth/on-boarding/user-info?type=${type}`);
                break;
            default:
                navigate("/auth/on-boarding");
        }
    };

    return <Intro goToNextStep={goToNextStep} />;
}
