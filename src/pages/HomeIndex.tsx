import TodaysQuestion from "../components/home/TodaysQuestion";
import CustomCalendar from "../components/CustomCalendar";

export default function HomeIndex() {
    return (
        <div className="grid grid-cols-[573px_360px] grid-rows-[815px] gap-4 w-full">
            <TodaysQuestion />
            <div className="self-start">
                <CustomCalendar />
            </div>
        </div>
    );
}
