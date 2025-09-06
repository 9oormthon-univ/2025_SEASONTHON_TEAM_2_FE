import FamilyMembersCard from "../components/home/FamilyMembersCard";
import FamilyBookshelf from "../components/home/FamilyBookshelf";
import { EFL } from "../assets/icons";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import MainHeader from "../components/MainHeader.tsx";

export default function HomeLayout() {
    const username = localStorage.getItem("userInfo")?.split("|")[1] || "";
    const [isPopUpOpen, setPopUpOpen] = useState(true);

    useEffect(() => {
        const t = setTimeout(() => setPopUpOpen(false), 5000);
        return () => clearTimeout(t);
    }, []);

    return (
        <div className="relative w-screen max-w-[1440px] pt-20 m-auto flex items-center justify-center px-14 bg-[#EBEDF0]">
            <MainHeader hasUnread={true} />
            {/* 왼쪽*/}
            <main className="grid grid-cols-[360px_1fr] gap-4 p-10 w-full">
                <div className="flex flex-col gap-4">
                    <FamilyMembersCard />
                    <FamilyBookshelf />
                </div>
                <Outlet />
            </main>

            <div
                style={{ display: isPopUpOpen ? "" : "none" }}
                className="absolute bottom-20 left-1/2 -translate-x-1/2 flex justify-center items-center gap-2 bg-[#ECF5F1] border border-primary-200 w-[173px] h-[48px] rounded-sm"
            >
                <img src={EFL} alt="EverFlow_Character" />
                <p>{username.slice(1)}님, 환영해요!</p>
            </div>
        </div>
    );
}
