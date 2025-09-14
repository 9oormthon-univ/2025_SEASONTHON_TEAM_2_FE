import axios, {
  AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";
import { useAuthStore } from "../store/auth";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// 모든 요청을 보낼 때마다 자동으로 토큰을 헤더에 추가해주는 코드입니다.
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers = config.headers ?? {};
    try {
      const token = useAuthStore.getState().accessToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch {
      console.error("헤더에 토큰 추가 실패");
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// axiosInstance.interceptors.response.use(
//   (response: AxiosResponse) => {
//     return response;
//   },
//   async (error: AxiosError) => {
//     const originalRequest = error.config as InternalAxiosRequestConfig & {
//       _retry?: boolean;
//     };
//     if (
//       error.response?.status === 401 &&
//       originalRequest &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;

//       try {
//         const { refreshToken, setAccessToken, setRefreshToken, clear } =
//           useAuthStore.getState();
//         if (!refreshToken) {
//           console.error("Refresh token이 없습니다. 로그인이 필요합니다.");
//           clear();
//           window.location.href = "/";
//           return Promise.reject(error);
//         }

//         const res = await axios.post(
//           `${import.meta.env.VITE_API_URL}/auth/reissue`,
//           {
//             refreshToken,
//           }
//         );
//         const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
//           res.data;

//         setAccessToken(newAccessToken);
//         setRefreshToken(newRefreshToken);

//         if (originalRequest.headers) {
//           originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//         }

//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         console.error("토큰 재발급 실패 : ", refreshError);
//         const { clear } = useAuthStore.getState();
//         clear();
//         return Promise.reject(refreshError);
//       }
//     }
//   }
// );

export default axiosInstance;
