import TodaysQuestion from "../components/home/TodaysQuestion";
import CustomCalendar from "../components/CustomCalendar";
import { questionAnswers, sampleAppointments } from "../data/homeMockData";

export default function HomeIndex() {
    return (
        <div className="grid grid-cols-[573px_360px] grid-rows-[750px] gap-4 w-full">
        <TodaysQuestion answers={questionAnswers} />
    <CustomCalendar appointments={sampleAppointments} />
    </div>
);
}
