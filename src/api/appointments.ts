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

interface IAppointmentsDetailById {
  // appointmentId: number;
  // appointmentName: string;
  // color: string;
  // content: string;
  // endTime: string;
  // location: string;
  // proposeUserName: string;
  // startTime: string;
  // participants: string[];

  appointmentId: number;
  appointmentName: string;
  startTime: string;
  endTime: string;
  location: string;
  content?: string;
  proposeUserName: string;
  color: string;
  participantNum: number;
  participants: string[];
}

const getAppointmentsDetailById = async (appointmentId?: number) => {
  const response = await axios
    .get<{ data: IAppointmentsDetailById }>(
      `${import.meta.env.VITE_API_URL}/api/appointments/${appointmentId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    )
    .then((res) => res.data);
  return response.data;
};

const deleteAppointmentsById = async (appointmentId: number) => {
  const response = await axios.delete(
    `${import.meta.env.VITE_API_URL}/api/appointments/${appointmentId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }
  );
  return response.data;
};

export {
  createAppointments,
  getAppointmentsMonth,
  getAppointmentsByDate,
  getAppointmentsDetailById,
  deleteAppointmentsById,
};
