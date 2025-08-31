import CustomCalendar from "../components/CustomCalendar";
import Header from "../components/Header";

export default function Home() {
    const sampleAppointments = {
        '2025-08-25': [{ id: 1, title: '프로젝트 마감' }],
        '2025-08-26': [
            { id: 2, title: '엄마와의 데이트', details: '8/26 11:00, 서울대공원', attendees: '마마 외 1인' },
            { id: 3, title: '우리가족 여름휴가^^', details: '8/26-28, 제주도', attendees: '파파 외 3인' },
            { id: 4, title: '심야영화보자 ㅎ', details: '8/26 21:00, CGV 강남점', attendees: '구름이 외 1인' },
        ],
        '2025-08-29': [{ id: 5, title: '친구와 저녁 약속' }],
    };
    return (
        <div className="relative w-screen h-screen flex items-center justify-center px-14">
            <Header />
            <div className="border border-light-gray shadow-md  w-full h-[660px] grid grid-cols-3 gap-4 p-10">
                <div className="flex flex-col gap-4 justify-around">
                    <div className="flex flex-col gap-4">
                        <p className="font-semibold text-center text-navy-black text-2xl">인기 세대 토픽 Q&A 🔥</p>
                        <div className="max-w-[439px] h-[139px] border p-5 relative rounded-lg">
                            <input placeholder="Q. 알잘딱깔센이 무엇일까요?" className="w-full font-gangwon text-3xl" />
                            <button className="w-[83px] h-[31px] bg-primary-500 text-white absolute bottom-3 right-5 rounded-lg">답변하기</button>
                        </div>
                    </div>
                    <hr className="w-full" />
                    <div className="flex flex-col gap-4">
                        <p className="font-semibold text-center text-navy-black text-2xl">우리 가족 구성원</p>
                        <div className="border-dashed max-w-[403px] h-[189px] border-3 border-light-gray grid grid-cols-4 p-5">
                            {Array(4).fill(1).map(() => (
                                <div className="flex flex-col items-center">
                                    <div className="size-16 bg-light-gray rounded-full" />
                                    <p className="text-dark-gray">구름이</p>
                                </div>
                            ))}
                            <div className="flex flex-col items-center">
                                <div className="size-16 bg-light-gray rounded-full flex items-center justify-center">
                                    <p className="font-extrabold text-white text-4xl">+</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" size-20 w-full h-full border-l border-r">
                    <p>우리 가족 캘린더</p>
                    <CustomCalendar appointments={sampleAppointments} />
                </div>
                <div className="bg-pint-color size-20">
                    예정된 약속 영역
                </div>
            </div>
        </div>
    )
}