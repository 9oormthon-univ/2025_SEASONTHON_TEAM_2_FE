import { useEffect, useState } from "react";
import { CreateSuccessPage } from "../../components/onboarding";
import axiosInstance from "../../api/axiosInstance";

export interface IFamilyData {
    familyCode: string;
    familyName: string;
    verificationAnswer: string;
    verificationQuestion: string;
}

export default function CreateCompletePage() {
    const [familyData, setFamilyData] = useState<IFamilyData>({
        familyCode: '',
        familyName: '',
        verificationAnswer: '',
        verificationQuestion: ''
    });

    useEffect(() => {
        const getMyFamily = async () => {
            await axiosInstance('/family/my').then((res) => {
                if (res.data.success) {
                    setFamilyData(res.data.data);
                }
            })
        }
        getMyFamily();
    })
    return <CreateSuccessPage familyData={familyData} />;
}
