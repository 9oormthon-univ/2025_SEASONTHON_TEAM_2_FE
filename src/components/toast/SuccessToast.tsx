import { toast } from "react-toastify"
import { CheckIcon } from "../../assets/icons"

export const SuccessToast = (message: string) => (
    toast(<div className="flex justify-center items-center gap-2">
        <img src={CheckIcon} className="size-6" />
        <span className="text-center font-semibold text-primary-300">{message}</span>
    </div>)
)