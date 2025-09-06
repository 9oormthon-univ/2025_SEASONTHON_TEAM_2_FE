import axios from "axios";

export interface IAppointmentsProps {
  name: string;
  content: string;
  location: string;
  startTime: string;
  endTime: string;
  color: string;
  participantUserIds: number[];
}

const createAppointments = async (formData: IAppointmentsProps) => {
  console.log(formData);
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/appointments`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }
  );
  console.log(response.data);
  return response.data;
};

const getAppointmentsMonth = async (
  year: number,
  month: number
): Promise<string[]> => {
  const response = await axios
    .get<{ data: { dates?: string[] } }>(
      `${import.meta.env.VITE_API_URL}/api/appointments/month`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        params: {
          year,
          month,
        },
      }
    )
    .then((res) => res.data);
  return response.data.dates || [];
};

interface Appointment {
  appointmentId: number;
  appointmentName: string;
  startTime: string;
  endTime: string;
  location: string;
  proposeUserName: string;
  participantNum: number;
}

const getAppointmentsByDate = async (
  year: number,
  month: number,
  day: number
): Promise<Appointment[]> => {
  const response = await axios
    .get<{ data: Appointment[] }>(
      `${import.meta.env.VITE_API_URL}/api/appointments/date`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        params: {
          year,
          month,
          day,
        },
      }
    )
    .then((res) => res.data);
  console.log(response.data);
  return response.data || [];
};

export { createAppointments, getAppointmentsMonth, getAppointmentsByDate };
