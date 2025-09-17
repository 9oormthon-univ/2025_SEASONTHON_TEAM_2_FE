import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CreateSuccessPage } from "../../components/onboarding";
import axiosInstance from "../../api/axiosInstance";

export interface IFamilyData {
    familyCode: string;
    familyName: string;
    verificationAnswer: string;
    verificationQuestion: string;
    nickname?: string;
}

export default function CreateCompletePage() {
    const location = useLocation();
    const stateNickname = (location.state as { nickname?: string })?.nickname
        ?? localStorage.getItem("nickname")
        ?? "";

    const [familyData, setFamilyData] = useState<IFamilyData>({
        familyCode: '',
        familyName: '',
        verificationAnswer: '',
        verificationQuestion: '',
        nickname: stateNickname, // 처음부터 값 세팅
    });

    useEffect(() => {
        const getMyFamily = async () => {
            try {
                const res = await axiosInstance('/family/my');
                if (res.data.success) {
                    setFamilyData(prev => ({
                        ...res.data.data,
                        nickname: prev.nickname || stateNickname,
                    }));
                }
            } catch (e) {
                console.error("가족 정보 불러오기 실패:", e);
            }
        };
        getMyFamily();
    }, [stateNickname]);

    return <CreateSuccessPage familyData={familyData} />;
}
