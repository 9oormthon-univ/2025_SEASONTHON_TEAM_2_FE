import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import MainHeader from "../components/MainHeader";
import FamilyMembersCard from "../components/home/FamilyMembersCard";
import FamilyBookshelf from "../components/home/FamilyBookshelf";
import { useAuthStore } from "../store/auth";
import { EFL } from "../assets/icons";
import MobileTodaysQuestion from "../components/mobile/MobileTodaysQuestion";
import MobileFamilyMembersCard from "../components/mobile/MobileFamilyMembersCard.tsx";
import MobileNav from "../components/mobile/MobileNav.tsx";
import MobileHeader from "../components/mobile/MobileHeader.tsx";

export default function HomeLayout() {
    const { user } = useAuthStore();
    const username = user?.nickname || "";
    const [isPopUpOpen, setPopUpOpen] = useState(true);
    const [isLarge, setIsLarge] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setPopUpOpen(false), 5000);
        return () => clearTimeout(t);
    }, []);

    return (
        <div className="min-h-screen w-full bg-[#EBEDF0] overflow-x-hidden">


            {/*Desktop*/}
            <div className="hidden lg:block pt-20">
                <MainHeader />
                <main className="mx-auto grid grid-cols-[360px_1fr] gap-4 p-10 w-full max-w-[1400px]">
                    <div className="flex flex-col gap-4">
                        <FamilyMembersCard />
                        <FamilyBookshelf />
                    </div>
                    <Outlet />
                </main>

                {isPopUpOpen && (
                    <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex justify-center items-center gap-2 bg-[#ECF5F1] border border-primary-200 w-[173px] h-[48px] rounded-sm">
                        <img src={EFL} alt="EverFlow_Character" />
                        <p>{username.slice(1)}님, 환영해요!</p>
                    </div>
                )}
            </div>

            {/*Mobile*/}
            <div className="block lg:hidden pt-18">
                <MobileHeader />
                <div className="mx-auto w-full max-w-[430px]">
                    <div className="px-4 pt-4 pb-2 flex items-center justify-between">
                        <h1 className="text-[28px] font-semibold">민서 님</h1>
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
                                <MobileFamilyMembersCard />
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
                                <MobileFamilyMembersCard />
                            </section>

                            <section className="grid grid-cols-2 gap-3">
                                <button className="h-14 rounded-2xl bg-[#CFE7D0] text-green-900 font-semibold">알림</button>
                                <button className="h-14 rounded-2xl bg-[#CFE7D0] text-green-900 font-semibold">내정보</button>

                                <button className="col-span-1 h-44 rounded-2xl bg-[#FFE2AA] text-[#8C6A2A] text-left p-4">
                                    <div className="text-lg font-semibold">오늘의 질문</div>
                                    <div className="mt-auto text-right">›</div>
                                </button>

                                <button className="col-span-1 h-44 rounded-2xl bg-[#CFE0FF] text-[#5C719F] text-left p-4">
                                    <div className="text-lg font-semibold">가족 책장</div>
                                    <div className="mt-auto text-right">›</div>
                                </button>

                                <button className="col-span-1 h-40 rounded-2xl bg-[#FFC7C0] text-[#A05D54] text-left p-4">
                                    <div className="text-lg font-semibold">메모장</div>
                                    <div className="mt-auto text-right">›</div>
                                </button>

                                <div />
                            </section>
                        </main>
                    )}

                    {!isLarge && <MobileNav />}

                    {isPopUpOpen && (
                        <div className="fixed left-1/2 -translate-x-1/2 bottom-24 flex items-center gap-2 bg-[#ECF5F1] border border-primary-200 w-[200px] h-[50px] rounded-md">
                            <img src={EFL} alt="EverFlow_Character" className="h-6 w-6" />
                            <p className="text-[18px]">{username.slice(1)}님, 환영해요!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
