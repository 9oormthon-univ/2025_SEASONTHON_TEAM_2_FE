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

export { createAppointments };
