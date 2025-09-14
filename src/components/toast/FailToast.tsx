import { toast } from "react-toastify"
import { Xmark } from "../../assets/icons/home"

export const FailToast = (message: string) => (
    toast(<div className="flex justify-center items-center gap-2">
        <img src={Xmark} className="size-6" />
        <span className="text-center font-semibold text-point-color-orange">{message}</span>
    </div>)
)