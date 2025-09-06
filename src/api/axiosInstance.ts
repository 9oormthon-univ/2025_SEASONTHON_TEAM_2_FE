import axios from "axios";

const axiosInstance = axios.create({
  // 👇 바로 이 한 줄이 문제를 해결합니다!
  // .env 파일에 작성한 VITE_API_URL 값을 기본 주소로 사용하게 됩니다.
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 모든 요청을 보낼 때마다 자동으로 토큰을 헤더에 추가해주는 코드입니다.
axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("access_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);

export default axiosInstance;