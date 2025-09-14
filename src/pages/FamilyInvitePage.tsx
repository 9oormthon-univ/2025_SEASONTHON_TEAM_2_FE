import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import { useQuery } from '@tanstack/react-query';
import { validateFamilyCode } from '../api/auth/family';
import LoadingSpinner from '../components/LoadingSpinner';
import KakaoSocialBtn from '../components/KakaoSocialBtn';

const FamilyInvitePage: React.FC = () => {
    const { familyCode } = useParams<{ familyCode: string }>();
    const navigate = useNavigate();
    const { user, accessToken } = useAuthStore();
    const [isValidating, setIsValidating] = useState(true);

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

        // 로그인되지 않은 사용자인 경우
        setIsValidating(false);
    }, [user, accessToken, familyCode, navigate]);

    // //로그인이 안되어있을 경우
    // if (error) {
    //     return (
    //         <div className="min-h-screen flex items-center justify-center bg-gray-50">
    //             <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
    //                 <div className="text-red-500 text-6xl mb-4">❌</div>
    //                 <h1 className="text-2xl font-bold text-gray-900 mb-2">
    //                     {error.message}
    //                 </h1>
    //                 <p className="text-gray-600 mb-6">
    //                     로그인을 한 후 다시 접속해주세요.
    //                 </p>
    //                 <button
    //                     onClick={() => navigate('/')}
    //                     className="w-full bg-primary-200 text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-300 transition-colors"
    //                 >
    //                     홈으로 돌아가기
    //                 </button>
    //             </div>
    //         </div>
    //     );
    // }

    // // 로딩 중
    // if (isLoading || isValidating) {
    //     return (
    //         <div className="min-h-screen flex items-center justify-center bg-gray-50">
    //             <LoadingSpinner text="초대 링크를 확인하는 중..." />
    //         </div>
    //     );
    // }

    // 로그인되지 않은 사용자에게 로그인 유도
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
                <div className="text-green-500 text-6xl mb-4">🎉</div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    가족 초대를 받으셨습니다!
                </h1>
                <p className="text-gray-600 mb-6">
                    {familyInfo?.data?.familyName || '가족'}에 초대되었습니다.
                    <br />
                    로그인 후 가족에 참여하세요.
                </p>

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
