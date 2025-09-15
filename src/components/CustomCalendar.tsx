import React, { useMemo, useState } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import 'react-calendar/dist/Calendar.css';
import '../style/CustomeCalendar.css';
import type { Value } from 'react-calendar/dist/shared/types.js';
import AppointmentModal from "./modal/AppointmentModal.tsx";
import AppointmentDetailModal from "./modal/AppointmentDayDetailModal.tsx";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createAppointments, getAppointmentsMonth, getAppointmentsByDate, deleteAppointmentsById } from '../api/appointments';
import type { AppointmentPayload } from '../api/appointments';
import LoadingSpinner from './LoadingSpinner.tsx';
import { SuccessToast } from './toast/SuccessToast.tsx';
import { FailToast } from './toast/FailToast.tsx';

// UI에 약속 목록을 표시하기 위한 데이터 타입
interface UiAppointment {
    id: number;
    title: string;
    details?: string;
    attendees?: string;
    color: string;
}

const DATE_FORMAT = 'YYYY-MM-DD';

// 약속 리스트 아이템 컴포넌트
const AppointmentItem: React.FC<{
    appointment: UiAppointment;
    onClick?: (a: UiAppointment) => void;
}> = React.memo(({ appointment, onClick }) => (
    <li
        onClick={() => onClick?.(appointment)}
        onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') e.preventDefault(); onClick?.(appointment);
        }}
        role="button"
        tabIndex={0}
        style={{ backgroundColor: (appointment.color || "#CDECCB") + "AA" }}
        className="flex justify-between h-[60px] items-center p-3.5 mb-4 rounded-xl relative cursor-pointer hover:opacity-90"
    >
        <div style={{ backgroundColor: appointment.color || "#CDECCB" }} className="h-full w-1.5 absolute left-0 rounded-l-2xl" />
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
const CustomCalendar = () => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [activeMonth, setActiveMonth] = useState<Date>(new Date());
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();

    const [viewingAppointmentId, setViewingAppointmentId] = useState<number | null>(null);
    const [detailOpen, setDetailOpen] = useState(false);

    const activeYear = moment(activeMonth).year();
    const activeMonthNum = moment(activeMonth).month() + 1;

    const { data: monthData } = useQuery({
        queryKey: ['appointments', activeYear, activeMonthNum],
        queryFn: () => getAppointmentsMonth(activeYear, activeMonthNum),
    });

    const appointmentDates = useMemo(() => new Set(monthData || []), [monthData]);
    const hasAppointment = (date: Date) => appointmentDates.has(moment(date).format(DATE_FORMAT));

    const selectedYear = moment(selectedDate).year();
    const selectedMonth = moment(selectedDate).month() + 1;
    const selectedDay = moment(selectedDate).date();

    const { data: dailyAppointmentsData, isLoading: dailyLoading } = useQuery({
        queryKey: ['dailyAppointments', selectedYear, selectedMonth, selectedDay],
        queryFn: () => getAppointmentsByDate(selectedYear, selectedMonth, selectedDay),
        enabled: hasAppointment(selectedDate),
    });

    const selectedDateAppointments: UiAppointment[] = useMemo(() => {
        if (!dailyAppointmentsData) return [];
        const appointmentsFromApi = Array.isArray(dailyAppointmentsData) ? dailyAppointmentsData : [dailyAppointmentsData];
        return appointmentsFromApi.map(appt => ({
            id: appt.appointmentId,
            title: appt.appointmentName,
            details: `${moment(appt.startTime).format('HH:mm')}~${moment(appt.endTime).format('HH:mm')}, ${appt.location}`,
            attendees: `${appt.proposeUserName} 외 ${appt.participantNum > 1 ? appt.participantNum - 1 + '명' : '0명'}`,
            color: appt.color,
        }));
    }, [dailyAppointmentsData]);

    const createAppointmentMutation = useMutation({
        mutationFn: createAppointments,
        onSuccess: () => {
            SuccessToast("약속이 성공적으로 생성되었습니다.");
            queryClient.invalidateQueries({ queryKey: ['appointments'] });
            queryClient.invalidateQueries({ queryKey: ['dailyAppointments'] });
        },
        onError: (err) => {
            console.error("약속 생성 중 오류 발생:", err);
            FailToast("약속 생성에 실패했습니다.");
        },
    });

    const deleteAppointmentMutation = useMutation({
        mutationFn: deleteAppointmentsById,
        onSuccess: () => {
            SuccessToast("약속이 성공적으로 취소되었습니다.");
            queryClient.invalidateQueries({ queryKey: ['appointments'] });
            queryClient.invalidateQueries({ queryKey: ['dailyAppointments'] });
        },
        onError: (error) => {
            console.error("약속 취소 중 오류 발생:", error);
            FailToast("약속 취소에 실패했습니다.");
        },
    });

    const handleDateChange = (value: Value) => {
        if (value instanceof Date) setSelectedDate(value);
    };

    const handleMonthChange = ({ activeStartDate }: { activeStartDate: Date | null }) => {
        if (activeStartDate) {
            setActiveMonth(activeStartDate);
            if (!moment(activeStartDate).isSame(selectedDate, 'month')) setSelectedDate(activeStartDate);
        }
    };

    const goToToday = () => {
        const today = new Date();
        setActiveMonth(today);
        setSelectedDate(today);
    };

    const openDetail = (clickedAppt: UiAppointment) => {
        setViewingAppointmentId(clickedAppt.id);
        setDetailOpen(true);
    };

    const handleCloseDetailModal = () => {
        setDetailOpen(false);
        setViewingAppointmentId(null);
    };

    return (
        <div className='h-[738px] m-auto p-5 overflow-hidden bg-white rounded-2xl border border-light-gray'>
            <div className='h-fit'>
                <header className="flex items-center mb-4">
                    <div className='flex items-center gap-1 font-kccganpan text-xl'>
                        <p>{moment(selectedDate).format("YYYY년")}</p>
                        <p className='text-primary-300'>{moment(selectedDate).format("MM월")}</p>
                    </div>
                    <div className="grow" />
                    <button type="button" onClick={() => setOpen(true)} className="bg-primary-200 text-white rounded-lg px-4 py-2 font-semibold transition-colors hover:bg-primary-200 border-none">
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
                        {dailyLoading ? (
                            <LoadingSpinner text='약속을 불러오는 중...' />
                        ) : (
                            <div>
                                {selectedDateAppointments.length > 0 ? (
                                    <ul>
                                        {selectedDateAppointments.map((appt) => (
                                            <AppointmentItem
                                                key={appt.id}
                                                appointment={appt}
                                                onClick={openDetail}
                                            />
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-center px-2.5 py-8 bg-dark-gray text-white rounded-lg">등록된 약속이 없습니다. 😴</p>
                                )}
                            </div>
                        )}
                    </div>
                </section>
            </div>
            <AppointmentModal
                isOpen={open}
                defaultDate={moment(selectedDate).format(DATE_FORMAT)}
                onClose={() => setOpen(false)}
                onSubmit={(data: AppointmentPayload) => {
                    createAppointmentMutation.mutate(data);
                }}
            />

            <AppointmentDetailModal
                isOpen={detailOpen}
                appointmentId={viewingAppointmentId}
                onClose={handleCloseDetailModal}
                onCancel={(id) => {
                    if (window.confirm("정말로 이 약속을 취소하시겠습니까?")) {
                        deleteAppointmentMutation.mutate(id);
                    }
                    handleCloseDetailModal();
                }}
            />
        </div>
    );
};

export default CustomCalendar;