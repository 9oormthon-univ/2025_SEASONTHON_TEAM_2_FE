import axiosInstance from "./axiosInstance";

interface ApiResponse<T> {
  data: T;
}

export interface AppointmentPayload {
  name: string;
  content: string;
  location: string;
  startTime: string;
  endTime: string;
  color: string;
  participantUserIds: number[];
}

export interface Appointment {
  appointmentId: number;
  appointmentName: string;
  startTime: string;
  endTime: string;
  location: string;
  proposeUserName: string;
  participantNum: number;
  color: string;
}

export interface AppointmentDetail extends Appointment {
  content?: string;
  participants: string[];
}

export const createAppointments = async (payload: AppointmentPayload) => {
  try {
    const response = await axiosInstance.post<ApiResponse<AppointmentDetail>>(
      "/api/appointments",
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Error creating appointment:", error);
    throw error;
  }
};

export const getAppointmentsMonth = async (
  year: number,
  month: number
): Promise<string[]> => {
  try {
    const response = await axiosInstance.get<ApiResponse<{ dates: string[] }>>(
      "/api/appointments/month",
      { params: { year, month } }
    );
    return response.data.data?.dates ?? [];
  } catch (error) {
    console.error("Error fetching monthly appointments:", error);
    throw error;
  }
};

export const getAppointmentsByDate = async (
  year: number,
  month: number,
  day: number
): Promise<Appointment[]> => {
  try {
    const response = await axiosInstance.get<ApiResponse<Appointment[]>>(
      "/api/appointments/date",
      { params: { year, month, day } }
    );
    return response.data.data ?? [];
  } catch (error) {
    console.error("Error fetching daily appointments:", error);
    throw error;
  }
};

export const getAppointmentDetailById = async (
  appointmentId: number
): Promise<AppointmentDetail> => {
  if (!appointmentId) {
    throw new Error("Appointment ID is required.");
  }

  try {
    const response = await axiosInstance.get<ApiResponse<AppointmentDetail>>(
      `/api/appointments/${appointmentId}`
    );
    return response.data.data;
  } catch (error) {
    console.error(
      `Error fetching appointment detail for ID ${appointmentId}:`,
      error
    );
    throw error;
  }
};

export const deleteAppointmentsById = async (appointmentId: number) => {
  try {
    const response = await axiosInstance.delete(
      `/api/appointments/${appointmentId}`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error deleting appointment with ID ${appointmentId}:`,
      error
    );
    throw error;
  }
};

export const updateAppointmentStatus = async (
    appointmentId: number,
    status: "ACCEPTED" | "REJECTED"
) => {
  try {
    const response = await axiosInstance.patch(
        `/api/appointments/${appointmentId}/participant`,
        { acceptStatus: status }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating appointment status:", error);
    throw error;
  }
};

