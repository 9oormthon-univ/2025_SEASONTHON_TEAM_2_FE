import { useEffect, useState } from "react";
import { CreateSuccessPage } from "../../components/onboarding";
import axios from "axios";

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
            await axios.get(`${import.meta.env.VITE_API_URL}/family/my`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("access_token")}`
                }
            }).then((res) => {
                if (res.data.success) {
                    setFamilyData(res.data.data);
                }
            });
        }
        getMyFamily();
    })
    return <CreateSuccessPage familyData={familyData} />;
}
