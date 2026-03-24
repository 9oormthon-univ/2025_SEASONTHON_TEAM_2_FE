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

// 가족 정보 조회/수정 및 초대 링크 복사를 제공하는 관리 페이지입니다.
export default function FamilyManage() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState<IFamilyEditRequest>({
        familyName: '',
        verificationQuestion: '',
        verificationAnswer: '',
    });

    const { data: familyInfo, isLoading, isError } = useQuery({
        queryKey: ['familyInfo'],
        queryFn: getFamilyInfo,
        retry: (failureCount, error: AxiosError) => {
            if (error.response?.status === 404) return false;
            return failureCount < 3;
        },
    });

    // 내 가족 구성원 목록
    const { data: familyMembers } = useQuery({
        queryKey: ["my-family-members"],
        queryFn: getMyFamilyMembers,
    });

    useEffect(() => {
        if (familyInfo) {
            setEditData({
                familyName: familyInfo.familyName,
                verificationQuestion: familyInfo.verificationQuestion,
                verificationAnswer: familyInfo.verificationAnswer,
            });
        }
    }, [familyInfo]);

    // 가족 정보 수정 뮤테이션
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
        if (familyInfo) {
            setEditData({
                familyName: familyInfo.familyName,
                verificationQuestion: familyInfo.verificationQuestion,
                verificationAnswer: familyInfo.verificationAnswer,
            });
        }
        setIsEditing(false);
    };

    // 초대 링크를 클립보드에 복사합니다.
    const handleCopyClipBoard = async (code: string) => {
        try {
            await navigator.clipboard.writeText(`${import.meta.env.VITE_DEPLOY_URL}/invite/${code}`);
            toast(
                <div className="flex justify-center items-center gap-2">
                    <img src={CheckIcon} className="size-6" />
                    <span className="text-center font-semibold text-primary-300">초대링크를 복사했어요. 초대할 가족에게 공유해보세요.</span>
                </div>
            );
        } catch {
            toast(
                <div className="flex items-center justify-center gap-2">
                    <img src={Xmark} className="size-6" />
                    <span className="font-semibold text-red-500">
                        초대링크 복사에 실패했습니다. 다시 시도해주세요.
                    </span>
                </div>
            );
        }
    };

    if (isLoading) return <LoadingSpinner />;
    if (isError) return <div>오류가 발생했습니다. 다시 시도해주세요.</div>;

    return (
        <div className="w-[965px] h-full bg-white rounded-2xl border border-light-gray p-8 flex flex-col">
            {/* 헤더 */}
            <div className="flex justify-between items-center mb-6">
                <SectionHeader icon={PeoplesIcon} title="가족 관리" />
                <button onClick={() => navigate(-1)} className="p-2">
                    <img src={Xmark} alt="close" />
                </button>
            </div>

            {/* 본문 */}
            {familyInfo && (
                <div className="flex flex-col gap-12 flex-1">
                    <div className="flex flex-row justify-between gap-12 flex-1">
                        {/* 가족 코드 */}
                        <div className="flex flex-col items-center gap-4 flex-1">
                            <h2 className="font-kccganpan text-3xl text-primary-300 pb-5">우리 가족 코드</h2>
                            <p className="font-gangwon text-2xl text-dark-gray text-center">
                                <span className="text-red-500">가족 코드는</span> 우리 가족만 알고 있는{" "}
                                <span className="text-red-500">비밀</span>이에요!{" "}
                                <span>쉿!</span>
                            </p>
                            <h2 className="font-kccganpan tracking-widest text-6xl text-primary-300">
                                {familyInfo.familyCode}
                            </h2>
                            {!isEditing && (
                                <button
                                    onClick={() => handleCopyClipBoard(familyInfo.familyCode)}
                                    className="flex items-center justify-center gap-2 bg-primary-200 px-5 h-[80px] rounded-xl text-white text-[25px] font-semibold"
                                >
                                    <img src={LinkIcon} alt="link_icon" className="w-5 h-5" />
                                    초대 링크 복사하기
                                </button>
                            )}
                        </div>

                        {/* 가족 이름 */}
                        <div className="flex flex-col items-center gap-4 flex-1">
                            <h2 className="font-kccganpan text-3xl text-primary-300 pb-5">우리 가족 이름</h2>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="familyName"
                                    value={editData.familyName}
                                    onChange={handleEditDataChange}
                                    className="text-3xl text-center focus:outline-none bg-back-color p-2 rounded-lg w-full"
                                    maxLength={8}
                                />
                            ) : (
                                <p className="text-3xl font-bold">{familyInfo.familyName}</p>
                            )}
                        </div>
                    </div>


                    {/* 검증 질문 */}
                    <div className="flex flex-col gap-4 px-30">
                        <h2 className="font-kccganpan text-3xl text-primary-300">
                            가족 검증 질문
                        </h2>
                        <ul className="space-y-4">
                            <li className="flex flex-col gap-2">
                                <span className="font-bold text-2xl">Q. 질문</span>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="verificationQuestion"
                                        value={editData.verificationQuestion}
                                        onChange={handleEditDataChange}
                                        className="text-2xl focus:outline-none p-2 rounded-lg bg-back-color"
                                        placeholder="질문을 입력해주세요"
                                        maxLength={20}
                                    />
                                ) : (
                                    <span className="text-dark-gray text-2xl">
                                        {familyInfo.verificationQuestion}
                                    </span>
                                )}
                            </li>
                            <li className="flex flex-col gap-2">
                                <span className="font-bold text-2xl">A. 답변</span>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="verificationAnswer"
                                        value={editData.verificationAnswer}
                                        onChange={handleEditDataChange}
                                        className="text-2xl focus:outline-none p-2 rounded-lg bg-back-color"
                                        placeholder="답변을 입력해주세요"
                                        maxLength={8}
                                    />
                                ) : (
                                    <span className="text-dark-gray text-2xl">
                                        {familyInfo.verificationAnswer}
                                    </span>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            )}

            {/* 하단 버튼 */}
            <div className="flex justify-end gap-4 mt-8">
                {isEditing ? (
                    <>
                        <button
                            onClick={handleCancelEdit}
                            className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded-lg text-[20px]"
                        >
                            취소
                        </button>
                        <button
                            onClick={handleSaveChanges}
                            className="bg-primary-200 hover:bg-primary-300 text-white font-bold py-2 px-6 rounded-lg text-[20px]"
                        >
                            저장하기
                        </button>
                    </>
                ) : (
                    familyMembers?.creator && (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-primary-200 hover:bg-primary-300 text-white font-bold py-2 px-6 rounded-lg text-[20px]"
                        >
                            수정하기
                        </button>
                    )
                )}
            </div>
        </div>
    );
}
