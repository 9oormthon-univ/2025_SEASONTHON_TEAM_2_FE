import { useNavigate } from "react-router-dom";

type LargeBackButtonProps = {
    label?: string;
};

export default function LargeBackButton({ label = "처음으로" }: LargeBackButtonProps) {
    const navigate = useNavigate();

    return (
        <button
            className="w-full h-[60px] rounded-2xl bg-primary-200 text-white text-[25px] font-semibold"
            onClick={() => navigate("/home", { state: { isLarge: true } })}

        >
            {label}
        </button>
    );
}
