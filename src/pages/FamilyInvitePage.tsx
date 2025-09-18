import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import { useQuery } from '@tanstack/react-query';
import { validateFamilyCode } from '../api/auth/family';
import LoadingSpinner from '../components/LoadingSpinner';
import KakaoSocialBtn from '../components/KakaoSocialBtn';
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const FamilyInvitePage: React.FC = () => {
    const { familyCode } = useParams<{ familyCode: string }>();
    const navigate = useNavigate();
    const { user, accessToken, familyCode: userFamilyCode } = useAuthStore();

    const handleLoginSuccess = () => {
        localStorage.setItem("postLoginRedirect", `/auth/on-boarding/user-info?type=JOIN&code=${familyCode}`);
    };

    const { data: familyInfo, isLoading, error } = useQuery({
        queryKey: ['validateFamilyCode', familyCode],
        queryFn: () => validateFamilyCode(familyCode!),
        enabled: !!familyCode,
        retry: false,
    });

    useEffect(() => {
        if (!familyCode) {
            navigate('/');
            return;
        }
        if (user && accessToken) {
            if (userFamilyCode) {
                navigate('/home');
                return;
            }
            navigate(`/auth/on-boarding/user-info?type=JOIN&code=${familyCode}`);
            return;
        }
    }, [user, accessToken, familyCode, navigate, userFamilyCode]);

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
                    <div className="w-full h-full text-6xl mb-4 size-[200px] flex items-center justify-center">
                        <DotLottieReact src='/xmark.lottie' autoplay loop />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">올바르지 않은 링크입니다.</h1>
                    <p className="text-gray-600 mb-6">링크를 다시 확인해주세요.</p>
                    <button
                        onClick={() => navigate('/')}
                        className="w-full bg-primary-200 text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-300"
                    >
                        홈으로 돌아가기
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F7F7F7]">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center gap-6 min-h-[614px]">
                {isLoading || !familyInfo ? (
                    <div className="flex m-auto">
                        <LoadingSpinner size={68} text="가족 정보 불러오는 중" />
                    </div>
                ) : (
                    <>
                        <div className="flex flex-col items-center gap-2 mb-4">
                            <div className="size-[200px]">
                                <DotLottieReact src="/firework.lottie" loop autoplay />
                            </div>
                            <h1 className="font-kccganpan text-3xl md:text-4xl text-gray-800 font-bold text-center leading-tight">
                                {familyInfo.data.familyName}의 <br /> 가족으로 초대받았어요!
                            </h1>
                        </div>
                        <div className="flex flex-col items-center gap-3">
                            <div className="flex items-center justify-center -space-x-2">
                                {familyInfo.data.profileImageUrls.map((profile, idx) => (
                                    <img key={idx} src={profile} className="size-12 rounded-full border-2 border-white shadow-sm" />
                                ))}
                            </div>
                            <p className="font-kccganpan text-base text-gray-600 font-medium">
                                <span className="font-bold text-gray-800">🎉 {familyInfo.data.leaderName}님</span> 외 {familyInfo.data.memberCount - 1}명의 가족이 함께하고 있어요! 🎉
                            </p>
                        </div>
                        <div className="w-full space-y-3 mt-4">
                            <KakaoSocialBtn onSuccess={handleLoginSuccess} />
                            <button
                                onClick={() => navigate('/')}
                                className="w-full text-gray-500 py-3 rounded-lg border border-gray-300 hover:bg-gray-100"
                            >
                                나중에 참여하기
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default FamilyInvitePage;
