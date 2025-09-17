import { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import MainHeader from "../components/MainHeader";
import FamilyMembersCard from "../components/home/FamilyMembersCard";
import FamilyBookshelf from "../components/home/FamilyBookshelf";
import { useAuthStore } from "../store/auth";
import { EFL } from "../assets/icons";
import { toast } from "react-toastify";
import MobileTodaysQuestion from "../components/mobile/MobileTodaysQuestion";
import MobileFamilyMembersCard from "../components/mobile/MobileFamilyMembersCard.tsx";
import MobileNav from "../components/mobile/MobileNav.tsx";
import MobileHeader from "../components/mobile/MobileHeader.tsx";
import FamilyMemo from "../components/FamilyMemo.tsx";

const WelcomeToast = ({ username }: { username: string }) => (
    <div className="flex justify-center items-center gap-2">
        <img src={EFL} alt="EverFlow_Character" />
        <p className="text-primary-300">{username}님, 환영해요!</p>
    </div>
);

export default function HomeLayout() {
    const { user } = useAuthStore();
    const username = user?.nickname || "";

    const [isLarge, setIsLarge] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();


    useEffect(() => {
        if (username) {
            toast(<WelcomeToast username={username} />);
        }
    }, [username]);

    useEffect(() => {
        if (location.state?.isLarge) {
            setIsLarge(true);
        }
    }, [location.state]);

    return (
        <div className="min-h-screen w-full bg-back-color overflow-x-hidden">

            {/* Desktop */}
            <div className="hidden lg:block pt-20">
                <MainHeader hasUnread={true} />
                <main className="mx-auto grid grid-cols-[360px_1fr] gap-4 p-10 w-full max-w-[1400px]">
                    <div className="flex flex-col gap-4">
                        <FamilyMembersCard />
                        <FamilyBookshelf />
                        <FamilyMemo />
                    </div>
                    <Outlet />
                </main>
            </div>

            {/* Mobile */}
            <div className="block lg:hidden pt-18">
                <MobileHeader isLarge={isLarge} />
                <div className="mx-auto w-full max-w-[430px]">
                    <div className="px-4 pt-4 pb-2 flex items-center justify-between">
                        {/* 사용자 이름이 동적으로 표시되도록 수정 */}
                        <h1 className="text-[28px] font-semibold">{username} 님</h1>
                        <label className="flex items-center gap-2 text-primary-300 select-none cursor-pointer">
                            <span className="text-[20px] font-medium">큰 글씨 화면</span>
                            <div className="relative inline-flex items-center">
                                <input
                                    type="checkbox"
                                    checked={isLarge}
                                    onChange={(e) => setIsLarge(e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-primary-300 transition-colors"></div>
                                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                            </div>
                        </label>
                    </div>

                    {!isLarge && (

                        <main className="px-4 py-4 space-y-5 leading-[1.5] overflow-y-auto pb-28">
                            <section>
                                <MobileFamilyMembersCard isLarge={false} />
                                <p className="mt-2 text-[#8E9AA6] text-[14px] font-normal text-right">
                                    * 가족 수정은 PC 환경에서 가능해요
                                </p>
                            </section>
                            <MobileTodaysQuestion />
                        </main>
                    )}

                    {isLarge && (
                        <main className="px-4 py-4 space-y-4">
                            <section className="space-y-3">
                                <MobileFamilyMembersCard isLarge={true} />
                            </section>
                            <section className="grid grid-cols-2 gap-3 mb-3">
                                <button className="h-25 rounded-2xl bg-[#CAE5CA] text-primary-300 text-[25px]"
                                        onClick={()=>navigate("/mobile/notifications",{ state: { isLarge: true } })}>알림</button>
                                <button className="h-25 rounded-2xl bg-[#CAE5CA] text-primary-300 text-[25px]"
                                        onClick={()=>navigate("/profile",{ state: { isLarge: true } })}>내정보</button>
                            </section>

                            <section className="grid grid-cols-2 gap-3">
                                <button className="row-span-2 h-[450px] rounded-2xl bg-[#FFE7B7] text-[#A98A49] p-4"
                                    onClick={() => navigate("/today")}>
                                    <div className="text-[25px] font-normal">오늘의 질문</div>
                                </button>

                                <button className="rounded-2xl bg-[#CFE0FF] text-[#5C719F] p-4"
                                    onClick={() => navigate("/book", { state: { isLarge: true } })}>
                                    <div className="text-[25px] font-normal">가족 책장</div>
                                </button>

                                <button className="rounded-2xl bg-[#FFC7C0] text-[#A05D54] p-4"
                                    onClick={() => navigate("/memo", { state: { isLarge: true } })}>
                                    <div className="text-[25px] font-normal">메모장</div>
                                </button>
                            </section>

                        </main>
                    )}

                    {!isLarge && <MobileNav />}
                </div>
            </div>
        </div>
    );
}