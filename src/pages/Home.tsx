import Header from "../components/Header";
import CustomCalendar from "../components/CustomCalendar";
import FamilyMembersCard from "../components/home/FamilyMembersCard";
import FamilyBookshelf from "../components/home/FamilyBookshelf";
import TodaysQuestion from "../components/home/TodaysQuestion";
import { sampleAppointments, familyMembers, familyBooks, questionAnswers } from "../data/homeMockData";
import { EFL } from "../assets/icons";
import { useEffect, useState } from "react";

const Home: React.FC = () => {
    const username = localStorage.getItem("userInfo")?.split("|")[1] || "";
    const [isPopUpOpen, setPopUpOpen] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setPopUpOpen(false);
        }, 5000);

        return () => {
            clearTimeout(timer);
        }
    })

    return (
        <div className="relative w-screen h-screen max-w-[1440px] pt-20 m-auto flex items-center justify-center px-14 bg-[#EBEDF0]">
            <Header />
            <main className="grid grid-cols-[360px_573px_360px] grid-rows-[750px] gap-4 p-10 w-full">
                {/* 왼쪽 열 */}
                <div className="flex flex-col gap-4">
                    <FamilyMembersCard members={familyMembers} />
                    <FamilyBookshelf books={familyBooks} />
                </div>
                {/* 중앙 열 */}
                <TodaysQuestion answers={questionAnswers} />

                {/* 오른쪽 열 */}
                <CustomCalendar appointments={sampleAppointments} />

            </main>
            <div style={{ display: isPopUpOpen ? "" : "none" }} className="absolute bottom-20 left-1/2 -translate-x-1/2 flex justify-center items-center gap-2 bg-[#ECF5F1] border border-primary-200 w-[173px] h-[48px] rounded-sm">
                <img src={EFL} alt="EverFlow_Character" />
                <p>{username.slice(1)}님, 환영해요!</p>
            </div>
        </div>
    );
};

export default Home;