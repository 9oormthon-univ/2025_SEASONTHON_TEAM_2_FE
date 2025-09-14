import FamilyMembersCard from "../components/home/FamilyMembersCard";
import FamilyBookshelf from "../components/home/FamilyBookshelf";
import { EFL } from "../assets/icons";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import MainHeader from "../components/MainHeader.tsx";
import { useAuthStore } from "../store/auth.ts";
import { toast } from "react-toastify";

const WelcomeToast = ({ username }: { username: string }) => (
    <div className="flex justify-center items-center gap-2">
        <img src={EFL} alt="EverFlow_Character" />
        <p className="text-primary-300">{username.slice(1)}님, 환영해요!</p>
    </div>
);

export default function HomeLayout() {
    const { user } = useAuthStore();
    const username = user?.nickname || "";

    useEffect(() => {
        if (username) {
            toast(<WelcomeToast username={username} />);
        }
    }, [username]);



    return (
        <div className="min-h-screen w-full pt-20 bg-[#EBEDF0]">
            <MainHeader hasUnread={true} />
            <main className="mx-auto grid grid-cols-[360px_1fr] gap-4 p-10 w-full max-w-[1400px]">
                <div className="flex flex-col gap-4">
                    <FamilyMembersCard />
                    <FamilyBookshelf />
                </div>
                <Outlet />
            </main>
        </div>
    );
}
