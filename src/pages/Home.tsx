import React from "react";
import Header from "../components/Header";
import CustomCalendar from "../components/CustomCalendar";
import FamilyMembersCard from "../components/home/FamilyMembersCard";
import FamilyBookshelf from "../components/home/FamilyBookshelf";
import TodaysQuestion from "../components/home/TodaysQuestion";
import { sampleAppointments, familyMembers, familyBooks, questionAnswers } from "../data/homeMockData";

const Home: React.FC = () => {
    return (
        <div className="relative w-screen h-screen max-w-[1440px] m-auto flex items-center justify-center px-14 bg-[#EBEDF0]">
            <Header />
            <main className="h-[660px] grid grid-cols-[360px_573px_360px] gap-4 p-10 w-full">
                {/* 왼쪽 열 */}
                <div className="flex flex-col gap-4 max-w-[360px]">
                    <FamilyMembersCard members={familyMembers} />
                    <FamilyBookshelf books={familyBooks} />
                </div>
                {/* 중앙 열 */}
                <TodaysQuestion answers={questionAnswers} />

                {/* 오른쪽 열 */}
                <CustomCalendar appointments={sampleAppointments} />
            </main>
        </div>
    );
};

export default Home;