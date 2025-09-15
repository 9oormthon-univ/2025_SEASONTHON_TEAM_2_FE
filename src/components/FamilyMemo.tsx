import { useNavigate } from "react-router-dom";
import { NoteIcon } from "../assets/icons/home"

const FamilyMemo = () => {
    const navigate = useNavigate();
    return (
        <div className="w-full h-[62px] bg-white rounded-2xl font-kccganpan text-2xl text-primary-300 border border-[#D3D3D3] cursor-pointer flex items-center p-5 gap-2 relative" onClick={() => navigate("/home/family/memo")}>
            <img src={NoteIcon} className="size-[30px]" />
            <p>가족 메모장</p>
            <div className="text-primary-200 absolute right-8 text-3xl">&gt;</div>
        </div>
    )
}

export default FamilyMemo;