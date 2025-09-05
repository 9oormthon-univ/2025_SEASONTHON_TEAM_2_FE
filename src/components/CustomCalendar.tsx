import React, { useState } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import 'react-calendar/dist/Calendar.css';
import '../style/CustomeCalendar.css';
import type { Value } from 'react-calendar/dist/shared/types.js';

interface Appointment {
    id: number;
    title: string;
    details?: string;
    attendees?: string;
    color: string;
}

interface CustomCalendarProps {
    appointments: Record<string, Appointment[]>;
}

const DATE_FORMAT = 'YYYY-MM-DD';

//약속 리스트 아이템 컴포넌트
const AppointmentItem: React.FC<{ appointment: Appointment }> = React.memo(({ appointment }) => (
    <li style={{ backgroundColor: appointment.color + "1A" }} className="flex justify-between h-[60px] items-center p-3.5 mb-4 rounded-xl relative">
        <div style={{ backgroundColor: appointment.color }} className="h-full w-1.5 absolute left-0 rounded-l-2xl" />
        <div className="flex flex-col gap-1">
            <span className="font-kccganpan text-[#02320B] text-sm">{appointment.title}</span>
            {appointment.details && <span className="text-xs text-dark-gray">{appointment.details}</span>}
        </div>
        {appointment.attendees && (
            <div className="flex flex-col items-end justify-between text-sm gap-2">
                <span className='text-[#B2B2B2] text-xs'>{appointment.attendees}</span>
                <span className="arrow">&gt;</span>
            </div>
        )}
    </li>
));

// --- 메인 컴포넌트 ---
const CustomCalendar: React.FC<CustomCalendarProps> = ({ appointments }) => {

    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [activeMonth, setActiveMonth] = useState<Date>(new Date());

    // 선택된 날짜의 약속 목록
    const formattedDate = moment(selectedDate).format(DATE_FORMAT);
    const selectedDateAppointments = appointments[formattedDate] || [];

    // 날짜 변경 핸들러
    const handleDateChange = (value: Value) => {
        if (value instanceof Date) {
            setSelectedDate(value);
        }
    };

    // 월 변경 핸들러
    const handleMonthChange = ({ activeStartDate }: { activeStartDate: Date | null }) => {
        if (activeStartDate) {
            setActiveMonth(activeStartDate); // 월 변경
            if (moment(activeStartDate).isSame(new Date(), 'month')) {
                setSelectedDate(new Date());
            } else {
                setSelectedDate(activeStartDate);
            }
        }
    };

    // '오늘로' 버튼 클릭 핸들러
    const goToToday = () => {
        const today = new Date();
        setActiveMonth(today); // 캘린더 뷰 업데이트
        setSelectedDate(today); // 선택된 날짜 업데이트
    };

    // 약속이 있는 날짜들의 Set
    const appointmentDates = new Set(Object.keys(appointments));

    // 약속 유무 확인 함수
    const hasAppointment = (date: Date) => appointmentDates.has(moment(date).format(DATE_FORMAT));

    return (
        <div className='h-[738px] m-auto p-5 overflow-hidden bg-white rounded-2xl shadow-md'>
            <div className='h-fit'>
                <header className="flex items-center mb-4">
                    <div className='flex items-center gap-1 font-kccganpan text-xl'>
                        <p>{moment(selectedDate).format("YYYY년")}</p>
                        <p className='text-primary-300'>{moment(selectedDate).format("MM월")}</p>
                    </div>
                    <div className="grow" /> {/* Spacer */}
                    <button type="button" className="bg-primary-200 text-white rounded-lg px-4 py-2 font-semibold transition-colors hover:bg-primary-200 border-none">
                        약속 만들기 +
                    </button>
                </header>

                <main className='relative mb-8 min-h-[402px]'>
                    <button type="button" className="py-2 transition-opacity hover:opacity-70 absolute left-3 font-kccganpan" onClick={goToToday}>
                        오늘
                    </button>
                    <Calendar
                        onChange={handleDateChange}
                        value={selectedDate}
                        onActiveStartDateChange={handleMonthChange}
                        activeStartDate={activeMonth}
                        locale="ko-KR"
                        calendarType='gregory'
                        formatDay={(_, date) => moment(date).format('D')}
                        navigationLabel={({ date }) => moment(date).format('YYYY년 MM월')}
                        next2Label={null}
                        prev2Label={null}
                        tileContent={({ date, view }) =>
                            view === 'month' && hasAppointment(date) ? <div className="size-1.5 bg-label-red rounded-full mt-1" /> : null
                        }
                    />
                </main>
                <section>
                    <h2 className="mb-4 px-2.5 font-kccganpan text-[#353535]">
                        우리 {moment(selectedDate).format('YYYY년 M월 D일')}에 만나요~
                    </h2>
                    <div className='overflow-y-auto h-[244px] pb-16'>
                        {selectedDateAppointments.length > 0 ? (
                            <ul>
                                {selectedDateAppointments.map((appt) => (
                                    <AppointmentItem key={appt.id} appointment={appt} />
                                ))}
                            </ul>
                        ) : (
                            <p className="text-center px-2.5 py-8 bg-dark-gray text-white rounded-lg">등록된 약속이 없습니다. 😴</p>
                        )}
                    </div>
                </section>
            </div>
            {/* 약속 리스트 */}
        </div>
    );
};

export default CustomCalendar;