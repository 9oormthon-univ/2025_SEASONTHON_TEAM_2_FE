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
    const { user, accessToken } = useAuthStore();

    const handleLoginSuccess = () => {
        localStorage.setItem("postLoginRedirect", `/auth/on-boarding/user-info?type=JOIN&code=${familyCode}`);
    }

    // 가족 코드 유효성 검증
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
        // 로그인된 사용자인 경우
        if (user && accessToken) {
            // 이미 가족에 속해있는지 확인
            if (user.familyCode) {
                // 이미 가족에 속해있으면 홈으로 리다이렉트
                navigate('/home');
                return;
            }

            // 가족에 속해있지 않으면 가족 참여 플로우로 이동
            navigate(`/auth/on-boarding/join-question?code=${familyCode}`);
            return;
        }
    }, [user, accessToken, familyCode, navigate]);

    // //로그인이 안되어있을 경우
    if (error || !familyInfo) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
                    <div className="text-red-500 text-6xl mb-4">
                        <DotLottieReact
                            src='/xmark.lottie'
                            autoplay
                            loop
                        />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        올바르지 않은 링크입니다.
                    </h1>
                    <p className="text-gray-600 mb-6">
                        링크를 다시 한 번 더 확인해주세요.
                    </p>
                    <button
                        onClick={() => navigate('/')}
                        className="w-full bg-primary-200 text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-300 transition-colors"
                    >
                        홈으로 돌아가기
                    </button>
                </div>
            </div>
        );
    }

    // 로딩 중
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <LoadingSpinner size={40} text="가족 정보 불러오는 중..." />
            </div>
        );
    }

    // 로그인되지 않은 사용자에게 로그인 유도
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#EBEDF0]">
            <div className="max-w-xl w-full bg-white rounded-lg shadow-md p-6 text-center flex flex-col items-center gap-4">
                <div className="text-green-500 text-6xl flex flex-col items-center gap-4">
                    <DotLottieReact
                        src="/firework.lottie"
                        loop
                        autoplay
                        className='w-[300px] h-[300px]'
                    />
                    <h1 className="font-kccganpan text-3xl text-gray-900 mb-2">
                        {familyInfo.data.familyName}의 가족이 되시겠습니까?
                    </h1>
                </div>
                <div>

                    <div className='flex flex-col gap-2'>
                        <div className='flex items-center justify-center'>
                            {familyInfo.data.profileImageUrls.map((profile, idx) => (
                                <img key={idx} src={profile} className='size-10 rounded-full overflow-hidden border border-light-gray' />
                            ))}
                        </div>
                        <p className='font-kccganpan'>{familyInfo.data.leaderName}님 외 {familyInfo.data.memberCount - 1}명의 가족이 함께하고 있어요!!</p>
                    </div>
                </div>
                <div className="space-y-4">
                    <KakaoSocialBtn
                        onSuccess={handleLoginSuccess}
                    />
                    <button
                        onClick={() => navigate('/')}
                        className="w-full text-gray-500 py-2 px-4 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                    >
                        나중에 참여하기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FamilyInvitePage;
