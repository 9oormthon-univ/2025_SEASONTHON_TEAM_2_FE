import { useNavigate } from "react-router-dom";
import { LinkIcon, PeoplesIcon, Xmark } from "../../assets/icons/home";
import SectionHeader from "../common/SectionHeader";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createFamily, getFamilyInfo, joinFamily } from '../../api/auth/family';
import { useState } from 'react';
import LoadingSpinner from "../LoadingSpinner";

export default function FamilyManage() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [familyName, setFamilyName] = useState("");
    const [inviteCode, setInviteCode] = useState("");

    // 1. 가족 정보 조회
    const { data: familyInfo, isLoading, isError } = useQuery({
        queryKey: ['familyInfo'],
        queryFn: getFamilyInfo,
        // 👇 옵션: 데이터가 없을 경우(404 등) 에러로 처리하지 않도록 설정
        retry: (failureCount, error: any) => {
            if (error.response?.status === 404) {
                return false;
            }
            return failureCount < 3;
        },
    });

    // 2. 가족 생성
    const { mutate: createFamilyMutation } = useMutation({
        mutationFn: createFamily,
        onSuccess: () => {
            console.log("가족 생성 성공!");
            queryClient.invalidateQueries({ queryKey: ['familyInfo'] });
        },
        onError: (error) => {
            console.error("가족 생성 실패:", error);
        }
    });

    // 3. 가족 참여
    const { mutate: joinFamilyMutation } = useMutation({
        mutationFn: joinFamily,
        onSuccess: () => {
            console.log("가족 참여 성공!");
            queryClient.invalidateQueries({ queryKey: ['familyInfo'] });
        },
        onError: (error) => {
            console.error("가족 참여 실패:", error);
        }
    });

    const handleCreateFamily = () => {
        if (!familyName) {
            alert("가족 이름을 입력해주세요.");
            return;
        }
        createFamilyMutation(familyName);
    };

    const handleJoinFamily = () => {
        if (!inviteCode) {
            alert("초대 코드를 입력해주세요.");
            return;
        }
        joinFamilyMutation(inviteCode);
    };

    const handleCopyClipBoard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            alert('클립보드에 초대코드가 복사되었습니다.');
        } catch (e) {
            alert('복사에 실패하였습니다');
        }
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (isError) {
        return <div>오류가 발생했습니다. 다시 시도해주세요.</div>;
    }

    return (
        <div className="w-[965px] h-full bg-white rounded-2xl border border-[#D3D3D3]">
            <div className="relative w-full h-full overflow-hidden">
                <div className="absolute inset-6 p-4 bg-white rounded-2xl overflow-hidden flex flex-col z-9999">
                    <SectionHeader icon={PeoplesIcon} title="가족 관리" buttonIcon={Xmark} onButtonClick={() => navigate(-1)} />

                    {familyInfo ? (
                        // ✅ 가족 정보가 있을 때 UI (데이터 바인딩 완료)
                        <div className="grid grid-cols-2 p-8 gap-y-16">
                            <div className="flex flex-col gap-4 justify-center items-center">
                                <div>
                                    <h2 className="font-kccganpan text-3xl text-primary-300">생성한 가족 코드에요</h2>
                                    <p className="font-gangwon text-3xl"><span className="text-point-color-orange">가족 코드는</span> 우리 가족 외에는 <span className="text-point-color-orange">비밀</span>이에요 쉿!</p>
                                </div>
                                <div>
                                    <h2 className="font-kccganpan text-center tracking-widest text-6xl text-primary-300">{familyInfo.familyCode}</h2>
                                </div>
                                <div className="flex items-center justify-center bg-primary-100 w-[308px] h-[65px] border border-light-gray rounded-2xl relative">
                                    <img src={LinkIcon} alt="link_icon" className="absolute left-11" />
                                    <button onClick={() => handleCopyClipBoard(familyInfo.familyCode)} className="font-bold text-xl text-white">
                                        초대 코드 복사하기
                                    </button>
                                </div>
                            </div>
                            <div className="font-kccganpan text-primary-300 text-center gap-8 flex flex-col">
                                <h2 className="text-3xl">우리 가족 이름은?</h2>
                                <p className="text-4xl">{familyInfo.familyName}</p>
                            </div>
                            <div className="text-3xl font-kccganpan col-span-full">
                                <h2 className="text-primary-300 mb-4">현재 가족 검증 질문이에요.</h2>
                                <ul className="text-primary-300 ml-4">
                                    <li className="mb-4">Q. 질문 <span className="text-[#A78974]">{familyInfo.verificationQuestion}</span></li>
                                    <li>A. 답변 <span className="text-[#A78974]">{familyInfo.verificationAnswer}</span></li>
                                </ul>
                            </div>
                        </div>
                    ) : (
                        // 가족 정보가 없을 때 UI
                        <div className="flex flex-col items-center justify-center h-full gap-8">
                            <h2 className="font-kccganpan text-3xl text-primary-300">아직 소속된 가족이 없어요!</h2>
                            <p className="font-gangwon text-2xl">가족을 만들거나, 초대코드를 통해 참여해보세요.</p>
                            <div className="flex gap-4">
                                <input type="text" value={familyName} onChange={(e) => setFamilyName(e.target.value)} placeholder="생성할 가족 이름 입력" className="border p-2 rounded-lg" />
                                <button onClick={handleCreateFamily} className="bg-primary-100 text-white font-bold p-2 rounded-lg">가족 생성</button>
                            </div>
                            <div className="flex gap-4">
                                <input type="text" value={inviteCode} onChange={(e) => setInviteCode(e.target.value)} placeholder="초대 코드 입력" className="border p-2 rounded-lg" />
                                <button onClick={handleJoinFamily} className="bg-point-color-orange text-white font-bold p-2 rounded-lg">코드로 참여</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}