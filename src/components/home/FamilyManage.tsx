import { useNavigate } from "react-router-dom";
import { LinkIcon, PeoplesIcon, Xmark } from "../../assets/icons/home";
import SectionHeader from "../common/SectionHeader";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getFamilyInfo, editFamilyInfo, type IFamilyEditRequest, getMyFamilyMembers } from '../../api/auth/family';
import { useState, useEffect } from 'react';
import LoadingSpinner from "../LoadingSpinner";
import { toast } from "react-toastify";
import { CheckIcon } from "../../assets/icons";
import { SuccessToast } from "../toast/SuccessToast";
import { FailToast } from "../toast/FailToast";
import type { AxiosError } from "axios";
export default function FamilyManage() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // 수정 모드와 데이터 상태 관리
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState<IFamilyEditRequest>({
        familyName: '',
        verificationQuestion: '',
        verificationAnswer: '',
    });

    // 1. 가족 정보 조회 API 호출
    const { data: familyInfo, isLoading, isError } = useQuery({
        queryKey: ['familyInfo'],
        queryFn: getFamilyInfo,
        retry: (failureCount, error: AxiosError) => {
            if (error.response?.status === 404) return false;
            return failureCount < 3;
        },
    });

    //가족 대표가 누구인지 알기 위한 데이터
    const { data: familyMembers } = useQuery({
        queryKey: ["my-family-members"],
        queryFn: getMyFamilyMembers,
    });

    // familyInfo 데이터가 로드되면 editData state를 초기화
    useEffect(() => {
        if (familyInfo) {
            setEditData({
                familyName: familyInfo.familyName,
                verificationQuestion: familyInfo.verificationQuestion,
                verificationAnswer: familyInfo.verificationAnswer,
            });
        }
    }, [familyInfo]);

    // 2. 가족 정보 수정 API 호출 (PATCH)
    const { mutate: editFamilyMutation } = useMutation({
        mutationFn: editFamilyInfo,
        onSuccess: () => {
            SuccessToast("가족 정보가 성공적으로 수정되었습니다.");

            queryClient.invalidateQueries({ queryKey: ['familyInfo'] });
            setIsEditing(false); // 수정 모드 종료
        },
        onError: (error) => {
            console.error("가족 정보 수정 실패:", error);
            FailToast("가족 정보 수정에 실패했습니다. 다시 시도해주세요.");
        }
    });

    const handleEditDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditData(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveChanges = () => {
        editFamilyMutation(editData);
    };

    const handleCancelEdit = () => {
        // 수정 전 데이터로 복원
        if (familyInfo) {
            setEditData({
                familyName: familyInfo.familyName,
                verificationQuestion: familyInfo.verificationQuestion,
                verificationAnswer: familyInfo.verificationAnswer,
            });
        }
        setIsEditing(false);
    };

    const handleCopyClipBoard = async (code: string) => {
        try {
            await navigator.clipboard.writeText(`${import.meta.env.VITE_DEPLOY_URL}/invite/${code}`);
            toast(
                <div className="flex justify-center items-center gap-2">
                    <img src={CheckIcon} className="size-6" />
                    <span className="text-center font-semibold text-primary-300">초대링크를 복사했어요. 초대할 가족에게 공유해보세요.</span>
                </div>
            )
        } catch {
            toast(
                <div className="flex items-center justify-center gap-2">
                    <img src={Xmark} className="size-6" />
                    <span className="text-center font-semibold text-primary-300">초대링크 복사에 실패했습니다. 다시 시도해주세요.</span>
                </div>
            )
        }
    };

    // --- 렌더링 로직 ---

    if (isLoading) return <LoadingSpinner />;
    if (isError) return <div>오류가 발생했습니다. 다시 시도해주세요.</div>;

    return (
        <div className="w-[965px] h-full bg-white rounded-2xl border border-[#D3D3D3]">
            <div className="relative w-full h-full overflow-hidden">
                <div className="absolute inset-6 p-4 bg-white rounded-2xl overflow-hidden flex flex-col">
                    {/* 헤더: 제목, 닫기 버튼 */}
                    <div className="flex justify-between items-center mb-4">
                        <SectionHeader icon={PeoplesIcon} title="가족 관리" />
                        <button onClick={() => navigate(-1)} className="p-2">
                            <img src={Xmark} alt="close" />
                        </button>
                    </div>

                    {/* 본문: 가족 정보 표시 또는 수정 UI */}
                    {familyInfo && (
                        <div className="relative flex-1 p-8 grid grid-cols-2 gap-y-16">
                            {/* 가족 코드 영역 */}
                            <div className="flex flex-col gap-4 justify-center items-center">
                                <div>
                                    {isEditing ? (
                                        <h2 className="font-kccganpan text-3xl text-primary-300">현재 생성된 가족 코드에요</h2>
                                    ) : (
                                        <h2 className="font-kccganpan text-3xl text-primary-300">생성한 가족 코드에요</h2>
                                    )}
                                    <p className="font-gangwon text-3xl"><span className="text-point-color-orange">가족 코드는</span> 우리 가족 외에는 <span className="text-point-color-orange">비밀</span>이에요 쉿!</p>
                                </div>
                                <div>
                                    <h2 className="font-kccganpan text-center tracking-widest text-6xl text-primary-300">
                                        {familyInfo.familyCode}
                                    </h2>
                                </div>
                                {!isEditing && ( // 수정 모드 아닐 때만 복사 버튼 표시
                                    <div className="flex items-center justify-center bg-primary-100 w-[308px] h-[65px] border border-light-gray rounded-2xl relative">
                                        <img src={LinkIcon} alt="link_icon" className="absolute left-1/9" />
                                        <button onClick={() => handleCopyClipBoard(familyInfo.familyCode)} className="font-bold text-xl text-white">
                                            초대 링크 복사하기
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* 가족 이름 영역 */}
                            <div className="font-kccganpan text-primary-300 text-center gap-8 flex flex-col">
                                {isEditing ? (
                                    <h2 className="text-3xl">가족 이름을 수정할 수 있어요.</h2>
                                ) : (
                                    <h2 className="text-3xl">우리 가족 이름은?</h2>
                                )}
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="familyName"
                                        value={editData.familyName}
                                        onChange={handleEditDataChange}
                                        className="text-4xl text-center border-b-2 border-primary-200 focus:outline-none bg-gray-50 p-2 rounded-lg"
                                        maxLength={8}
                                    />
                                ) : (
                                    <p className="text-4xl">{familyInfo.familyName}</p>
                                )}
                            </div>

                            {/* 가족 검증 질문 영역 */}
                            <div className="text-3xl font-kccganpan col-span-full mt-8">
                                {isEditing && <h2 className="text-primary-300 mb-4">가족 질문을 수정할 수 있어요.</h2>}
                                {!isEditing && <h2 className="text-primary-300 mb-4">현재 가족 검증 질문이에요.</h2>}

                                <ul className="text-primary-300 ml-4 space-y-4">
                                    <li className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                                        <span className="font-bold whitespace-nowrap">Q. 질문</span>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="verificationQuestion"
                                                value={editData.verificationQuestion}
                                                onChange={handleEditDataChange}
                                                className="flex-1 text-3xl text-[#A78974] border-b-2 border-primary-200 focus:outline-none bg-gray-50 p-2 rounded-lg"
                                                placeholder="질문을 입력해주세요"
                                                maxLength={20}
                                            />
                                        ) : (
                                            <span className="text-[#A78974]">{familyInfo.verificationQuestion}</span>
                                        )}
                                    </li>
                                    <li className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                                        <span className="font-bold whitespace-nowrap">A. 답변</span>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="verificationAnswer"
                                                value={editData.verificationAnswer}
                                                onChange={handleEditDataChange}
                                                className="flex-1 text-3xl text-[#A78974] border-b-2 border-primary-200 focus:outline-none bg-gray-50 p-2 rounded-lg"
                                                placeholder="답변을 입력해주세요"
                                                maxLength={8}
                                            />
                                        ) : (
                                            <span className="text-[#A78974]">{familyInfo.verificationAnswer}</span>
                                        )}
                                    </li>
                                </ul>
                            </div>

                            {/* 수정 모드일 때 저장/취소 버튼 (하단 우측) */}
                            {isEditing && (
                                <div className="absolute bottom-6 right-6 flex gap-4">
                                    <button onClick={handleCancelEdit} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg">취소</button>
                                    <button onClick={handleSaveChanges} className="bg-primary-100 hover:bg-primary-200 text-white font-bold py-2 px-6 rounded-lg">저장하기</button>
                                </div>
                            )}

                            {familyMembers && familyMembers.creator && (
                                /* 수정 모드 아닐 때 '수정하기' 버튼 (하단 우측) */
                                !isEditing && (
                                    <div className="absolute bottom-6 right-6">
                                        <button onClick={() => setIsEditing(true)} className="bg-primary-100 hover:bg-primary-200 text-white font-bold py-2 px-6 rounded-lg">
                                            수정하기
                                        </button>
                                    </div>
                                )
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}