import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BookIcon, Xmark } from "../assets/icons/home";
import { getFamilyInfo, getFamilyMemo, saveFamilyMemo } from "../api/auth/family";
import { NoteBG } from "../assets/icons";
import { useEffect, useState } from "react";
import { SuccessToast } from "./toast/SuccessToast";
import { FailToast } from "./toast/FailToast";
import { useNavigate } from "react-router-dom";

const FamilyMemoDetail = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { data: familyInfo } = useQuery({
        queryKey: ["familyInfo"],
        queryFn: getFamilyInfo,
    });

    const { data: familyMemoData } = useQuery({
        queryKey: ["familyMemo"],
        queryFn: getFamilyMemo,
        initialData: {
            content: "",
            updatedAt: "",
        },
    });

    const [memo, setMemo] = useState(familyMemoData.content);

    useEffect(() => {
        if (familyMemoData) {
            setMemo(familyMemoData.content);
        }
    }, [familyMemoData]);


    const { mutate: saveMemoMutation, isPending: isSaving } = useMutation({
        mutationFn: saveFamilyMemo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["familyMemo"] });
            SuccessToast("메모가 성공적으로 저장됐어요!");
        },
        onError: (error) => {
            console.error("메모 저장 실패:", error);
            FailToast("메모 저장에 실패했어요! 다시 시도해주세요.");
        },
    });

    const handleMemoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMemo(e.target.value);
    };

    const onSaveFamilyMemo = () => {
        saveMemoMutation(memo);
    };

    return (
        <div className="w-[965px] h-[740px] bg-white rounded-2xl border border-light-gray">
            <div className="relative w-full h-full bg-transparent overflow-hidden">
                <div className="m-2 rounded-2xl overflow-hidden flex flex-col z-[9999]">
                    <div className="px-6 pt-6 pb-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <img src={BookIcon} alt="" className="w-7 h-7" />
                                <h2 className="font-kccganpan text-[24px] text-[#49684A]">{familyInfo?.familyName} 가족 메모장</h2>
                            </div>
                            <button onClick={() => { navigate("/home") }}>
                                <img src={Xmark} className="size-5" />
                            </button>
                        </div>
                    </div>

                    <div className="relative h-[517px] mt-4 w-full max-w-[891px] m-auto" style={{
                        backgroundImage: `url(${NoteBG})`
                    }}>
                        <img src={NoteBG} className="w-full absolute" />
                        <div className="px-8 pt-8 pb-6 flex-1 overflow-y-auto relative">
                            <textarea
                                onChange={handleMemoChange}
                                value={memo}
                                className="w-full h-[700px] focus:outline-none font-gangwon text-[26px] text-dark-gray z-20 relative bg-transparent"
                                style={{
                                    lineHeight: '51px',
                                    resize: 'none',
                                }}
                            />
                        </div>
                    </div>
                    <button disabled={isSaving} onClick={onSaveFamilyMemo} className="absolute right-8 bottom-8 bg-primary-200 text-white font-bold text-2xl rounded-2xl w-[215px] h-[59px] flex items-center justify-center">
                        {isSaving ? "저장 중..." : "저장하기"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FamilyMemoDetail;