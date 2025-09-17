import MobileNav from "../../components/mobile/MobileNav";
import MobileHeader from "../../components/mobile/MobileHeader.tsx";
import LargeBackButton from "../../components/mobile/LargeBackButton.tsx";
import { useLocation } from "react-router-dom";
import MobileProfile from "../../components/mobile/MobileProfile.tsx";
import { useAuthStore } from "../../store/auth";
import { useQuery } from "@tanstack/react-query";
import { getFamilyInfo } from "../../api/auth/family";

export default function ProfilePage() {
    const location = useLocation();
    const isLarge = location.state?.isLarge ?? false;

    // 로그인 유저 정보 가져오기
    const userInfo = useAuthStore((state) => state.user);

    // 가족 이름 불러오기
    const { data: familyInfo } = useQuery({
        queryKey: ["familyInfo"],
        queryFn: getFamilyInfo,
    });

    return (
        <div className="min-h-screen bg-back-color">
            {!isLarge && (
                <div>
                    <MobileHeader />
                    <div className="flex flex-col mx-auto w-full max-w-[430px]">
                        <div className="px-4 pt-20">
                            <h2 className="font-semibold text-[20px] py-3">마이페이지</h2>
                            <MobileProfile
                                userInfo={userInfo}
                                familyName={familyInfo?.familyName}
                                isLarge={false}
                            />
                            <p className="mt-2 text-light-gray text-[14px]">
                                * 프로필 수정은 PC에서만 가능해요.
                            </p>
                        </div>

                        <div className="flex-1 overflow-y-auto px-4 py-8 pb-40"></div>
                    </div>
                    <MobileNav />
                </div>
            )}
            {isLarge && (
                <div className="px-4 py-6">
                    <MobileHeader isLarge={true} />
                    <div className="mt-15 mx-auto w-full max-w-[430px]">
                        <LargeBackButton />
                        <div className="mt-10">
                            <h2 className="font-semibold text-[#49684A] text-[25px] py-3">내정보</h2>

                            <MobileProfile
                                userInfo={userInfo}
                                familyName={familyInfo?.familyName}
                                isLarge={true}
                            />
                            <p className="mt-2 text-gray-500 text-[20px]">
                                * 사진 및 닉네임 수정은 컴퓨터에서 가능해요.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
