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
        <div className="relative w-screen h-screen overflow-scroll flex items-center justify-center px-14 bg-[#EBEDF0]">
            <Header />
            <div className="h-[660px] grid grid-cols-3 gap-4 p-10">
                <div className="flex flex-col gap-4">
                    {/* 우리 가족 섹션 */}
                    <div className="flex flex-col gap-4 [360px] h-[165px] border border-light-gray p-4 bg-white rounded-2xl shadow-md">
                        <div className="flex justify-between gap-6">
                            <div className="flex items-center gap-2">
                                <div className="size-8 bg-dark-gray" />
                                <p className="font-semibold text-2xl">우리 가족</p>
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <div className="size-8 bg-dark-gray" />
                                    <button className="font-semibold w-[131px] h-[31px] bg-primary-300 text-white rounded-xl">
                                        구성원 추가하기 +
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            {Array(4).fill(1).map((_, index) => (
                                <div key={index} className="flex flex-col items-center gap-2">
                                    <div className="size-12 bg-light-gray rounded-full" />
                                    <p className="text-navy-black font-semibold">구름이</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 가족 책장 섹션 */}
                    <div className="flex flex-col gap-6 [360px] h-[435px] border border-light-gray p-4 bg-white rounded-2xl shadow-md">
                        <div className="flex justify-between gap-6">
                            <div className="flex items-center gap-2">
                                <div className="size-8 bg-dark-gray" />
                                <p className="font-semibold text-2xl">가족 책장</p>
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <div className="size-8 bg-dark-gray" />
                                    <button className="font-semibold w-[131px] h-[31px] bg-primary-300 text-white rounded-xl">
                                        구성원 추가하기 +
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            {Array(6).fill(1).map((_, index) => (
                                <div key={index} className="flex flex-col items-center gap-2">
                                    <div className="w-[96px] h-[120px] bg-light-gray rounded-2xl" />
                                    <p className="text-navy-black font-semibold">00의 책</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* 가족 공용 메모 섹션 */}
                    <div className="bg-white w-full h-[122px] rounded-2xl border border-light-gray flex items-center justify-center shadow-md">
                        <div className="size-10 bg-dark-gray" />
                    </div>
                </div>

                <div className="w-[573px] flex flex-col gap-4">
                    {/* 세대별 토픽 질문 섹션 */}
                    <div className="bg-white h-[203px] p-2 flex flex-col justify-around rounded-2xl border border-light-gray shadow-md">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="size-8 bg-dark-gray" />
                                <p className="font-semibold text-2xl">오늘의 질문</p>
                                <span className="font-semibold text-label-red">1일 남음</span>
                            </div>
                            <div>
                                <button className="font-semibold w-[131px] h-[31px] bg-primary-300 text-white rounded-xl">
                                    구성원 추가하기 +
                                </button>
                            </div>
                        </div>
                        <div>
                            <input placeholder="Q. 알잘딱깔센 이란 무슨 뜻 일까요?" className="w-full font-medium font-gangwon text-3xl" />
                        </div>
                        <div>
                            <button className="font-semibold w-full h-[48px] text-xl bg-primary-300 text-white rounded-xl">
                                답변하기
                            </button>
                        </div>
                    </div>

                    {/* 질문의 답변 리스트 섹션 */}
                    {Array(3).fill(1).map((_, index) => (
                        <div key={index} className="bg-white h-[131px] p-2 flex flex-col justify-around rounded-2xl border border-light-gray shadow-md">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="size-8 bg-dark-gray" />
                                    <p className="font-semibold text-2xl">엄마</p>
                                    <span className="font-semibold text-label-red">2025.08.28 14:56</span>
                                </div>
                                <div>
                                    <button className="font-semibold w-[131px] h-[31px] bg-primary-300 text-white rounded-xl">
                                        삭제하기
                                    </button>
                                </div>
                            </div>
                            <div>
                                <input placeholder="Q. 알잘딱깔센 이란 무슨 뜻 일까요?" className="w-full font-medium font-gangwon text-3xl" />
                            </div>
                        </div>
                    ))}
                </div>

                <CustomCalendar appointments={sampleAppointments} />
            </div>
        </div >
    )
}