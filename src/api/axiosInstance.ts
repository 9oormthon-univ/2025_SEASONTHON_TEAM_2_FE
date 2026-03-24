// 공용 Axios 인스턴스를 생성하고 인터셉터를 설정합니다.
// - baseURL은 VITE_API_URL 환경 변수에서 주입됩니다.
// - 모든 요청에 Zustand 스토어의 accessToken을 자동으로 헤더에 첨부합니다.
import axios, {
  AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";
import { useAuthStore } from "../store/auth";

// 애플리케이션 전역에서 사용할 Axios 인스턴스입니다.
const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// 요청 인터셉터: Authorization 헤더에 Bearer 토큰을 자동으로 추가합니다.
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

export default axiosInstance;
