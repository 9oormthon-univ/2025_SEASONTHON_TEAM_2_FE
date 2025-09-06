import React, { useState } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import 'react-calendar/dist/Calendar.css';
import '../style/CustomeCalendar.css';
import type { Value } from 'react-calendar/dist/shared/types.js';
import AppointmentModal from "./modal/AppointmentModal.tsx";
import AppointmentDetailModal, { type AppointmentDetail } from "./modal/AppointmentDayDetailModal.tsx";
// react-query와 API 함수를 import 합니다.
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAppointments } from '../api/appointments'; // 경로에 맞게 수정해주세요.
import type { IAppointmentsProps } from '../api/appointments';

interface Appointment {
    id: number;
    title: string;
    details?: string;
    attendees?: string;
    color: string;
    message?: string;
}

interface CustomCalendarProps {
    appointments: Record<string, Appointment[]>;
}

const DATE_FORMAT = 'YYYY-MM-DD';

//약속 리스트 아이템 컴포넌트
const AppointmentItem: React.FC<{
    appointment: Appointment;
    onClick?: (a: Appointment) => void;
}> = React.memo(({ appointment, onClick }) => (
    <li
        onClick={() => onClick?.(appointment)}
        onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick?.(appointment);
            }
        }}
        role="button"
        tabIndex={0}
        style={{ backgroundColor: appointment.color + "1A" }}
        className="flex justify-between h-[60px] items-center p-3.5 mb-4 rounded-xl relative cursor-pointer hover:opacity-90"
    >
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
    const [open, setOpen] = useState(false);

    // react-query 클라이언트와 mutation 훅 설정
    const queryClient = useQueryClient();

    const createAppointmentMutation = useMutation({
        mutationFn: createAppointments, // API 요청을 수행할 함수
        onSuccess: () => {
            alert("약속이 성공적으로 생성되었습니다. ✅");
            // 약속 생성 성공 시, 캘린더 데이터를 다시 불러오기 위해 관련 쿼리를 무효화합니다.
            // 'appointments'는 약속 목록을 가져오는 queryKey라고 가정합니다. 실제 사용하는 키로 변경해주세요.
            queryClient.invalidateQueries({ queryKey: ['appointments'] });
        },
        onError: (error) => {
            console.error("약속 생성 중 오류 발생:", error);
            alert("약속 생성에 실패했습니다. 😥");
        },
    });

    const formattedDate = moment(selectedDate).format(DATE_FORMAT);
    const selectedDateAppointments = appointments[formattedDate] || [];

    const handleDateChange = (value: Value) => {
        if (value instanceof Date) {
            setSelectedDate(value);
        }
    };

    const handleMonthChange = ({ activeStartDate }: { activeStartDate: Date | null }) => {
        if (activeStartDate) {
            setActiveMonth(activeStartDate);
            if (moment(activeStartDate).isSame(new Date(), 'month')) {
                setSelectedDate(new Date());
            } else {
                setSelectedDate(activeStartDate);
            }
        }
    };

    const goToToday = () => {
        const today = new Date();
        setActiveMonth(today);
        setSelectedDate(today);
    };

    const appointmentDates = new Set(Object.keys(appointments));
    const hasAppointment = (date: Date) => appointmentDates.has(moment(date).format(DATE_FORMAT));

    const [detailOpen, setDetailOpen] = useState(false);
    const [detailAppt, setDetailAppt] = useState<AppointmentDetail | null>(null);

    const openDetail = (a: Appointment) => {
        let dateTime: string | undefined;
        let place: string | undefined;
        if (a.details) {
            const [dt, ...rest] = a.details.split(",");
            dateTime = dt?.trim();
            place = rest.join(",").trim() || undefined;
        }

        setDetailAppt({
            id: a.id,
            title: a.title,
            dateTime,
            place,
            to: a.attendees ? a.attendees.split(" ")[0] : undefined,
            from: "나",
            message: a.message || "",
            color: a.color,
        });
        setDetailOpen(true);
    };

    return (
        <div className='h-[738px] m-auto p-5 overflow-hidden bg-white rounded-2xl shadow-md'>
            <div className='h-fit'>
                <header className="flex items-center mb-4">
                    <div className='flex items-center gap-1 font-kccganpan text-xl'>
                        <p>{moment(selectedDate).format("YYYY년")}</p>
                        <p className='text-primary-300'>{moment(selectedDate).format("MM월")}</p>
                    </div>
                    <div className="grow" />
                    <button type="button"
                        onClick={() => setOpen(true)}
                        className="bg-primary-200 text-white rounded-lg px-4 py-2 font-semibold transition-colors hover:bg-primary-200 border-none">
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
                                    <AppointmentItem
                                        key={appt.id}
                                        appointment={appt}
                                        onClick={openDetail} />
                                ))}
                            </ul>
                        ) : (
                            <p className="text-center px-2.5 py-8 bg-dark-gray text-white rounded-lg">등록된 약속이 없습니다. 😴</p>
                        )}
                    </div>
                </section>
            </div>
            <AppointmentModal
                isOpen={open}
                defaultDate={formattedDate}
                onClose={() => setOpen(false)}
                onSubmit={(data: IAppointmentsProps) => {
                    console.log('서버로 전송할 최종 데이터:', data);
                    // useMutation의 mutate 함수를 호출하여 API 요청을 실행합니다.
                    createAppointmentMutation.mutate(data);
                }}
            />
            <AppointmentDetailModal
                isOpen={detailOpen}
                appt={detailAppt}
                onClose={() => setDetailOpen(false)}
                onCancel={(id) => {
                    // TODO: 취소 처리 로직
                    console.log("cancel:", id);
                    setDetailOpen(false);
                }}
            />
        </div>
    );
};

export default CustomCalendar;