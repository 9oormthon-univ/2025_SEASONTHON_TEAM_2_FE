import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// 1️⃣ AuthUser 타입: 순수 유저 데이터만 남깁니다.
export type AuthUser = {
  userId: number;
  email: string;
  familyCode: string;
  nickname: string;
  profileUrl: string;
  role: "ROLE_USER" | "ROLE_GUEST";
} | null;

// 2️⃣ AuthState 타입: 스토어의 전체 상태를 정의합니다. 여기에 UI 상태를 추가합니다.
type AuthState = {
  accessToken: string | null;
  user: AuthUser;
  refreshToken: string | null;
  welcomeToastShown: boolean; // ✅ UI 상태는 여기에 위치
  setRefreshToken: (token: string | null) => void;
  setAccessToken: (token: string | null) => void;
  setUser: (user: AuthUser) => void;
  setWelcomeToastShown: (shown: boolean) => void; // ✅ Setter도 여기에 위치
  clear: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      refreshToken: null,
      welcomeToastShown: false,

      setRefreshToken: (token) => set({ refreshToken: token }),
      setAccessToken: (token) => set({ accessToken: token }),

      setUser: (user) => set({ user, welcomeToastShown: false }),

      setWelcomeToastShown: (shown) => set({ welcomeToastShown: shown }),
      clear: () =>
        set({
          refreshToken: null,
          accessToken: null,
          user: null,
          welcomeToastShown: false,
        }),
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => localStorage),

      partialize: (state) => ({
        refreshToken: state.refreshToken,
        accessToken: state.accessToken,
        user: state.user,
        welcomeToastShown: state.welcomeToastShown,
      }),
    }
  )
);
