import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getFamilyInfo, getFamilyMemo, saveFamilyMemo } from "../../api/auth/family";
import { useEffect, useState } from "react";
import { SuccessToast } from "../toast/SuccessToast";
import { FailToast } from "../toast/FailToast";
import MobileHeader from "../../components/mobile/MobileHeader.tsx";

type MobileMemoProps = {
    isLarge?: boolean;
};

export default function MobileMemo({ isLarge = false }: MobileMemoProps) {
    const queryClient = useQueryClient();

    // 가족 이름 불러오기
    const { data: familyInfo } = useQuery({
        queryKey: ["familyInfo"],
        queryFn: getFamilyInfo,
    });

    // 메모 불러오기
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

    // 저장 mutation
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
        <div
            className={`w-full max-w-[430px] mx-auto bg-white rounded-2xl rounded-tl-none mb-20 ${
                isLarge ? "border-[8px] border-[#FFBCB4] h-[630px]" : "h-[600px]"
            }`}
        >
            <MobileHeader />

            <div className="px-4 pt-6 pb-5">
                <h2 className={`font-semibold text-gray-600 mb-4 text-center ${
                    isLarge ? "text-[22px]" : "text-[18px]"}`}>
                    {familyInfo?.familyName} 가족 메모장
                </h2>

                <textarea
                    onChange={handleMemoChange}
                    value={memo}
                    placeholder="가족 메모를 입력하세요..."
                    className={`w-full h-[430px] rounded-lg py-2 px-6 text-dark-gray focus:outline-none resize-none
                    bg-[#FFFAEB] [background-image:repeating-linear-gradient(to_bottom,#FFFAEB_0px,#FFFAEB_42px,#555555_43px)] bg-left-top leading-[42px]
                    ${isLarge ? "text-[22px] [background-size:80%_44px] font-normal" : "text-[20px] [background-size:80%_43px] font-gangwon"}`}/>
            </div>

            <div className="px-4">
                <button
                    disabled={isSaving}
                    onClick={onSaveFamilyMemo}
                    className={`w-full ${isLarge ? "h-15 text-[25px]" : "h-12 text-[18px]"} text-center rounded-lg font-semibold ${
                        isSaving
                            ? "bg-gray-400 cursor-not-allowed"
                            : isLarge
                                ? "bg-[#FFBCB4] hover:opacity-90 text-[#A4635C]"
                                : "bg-primary-200 hover:opacity-90 text-white"
                    }`}
                >
                    {isSaving ? "저장 중..." : "저장하기"}
                </button>
            </div>
        </div>
    );
}
