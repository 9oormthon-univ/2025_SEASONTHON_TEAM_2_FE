// 인증/유저 정보를 관리하는 Zustand 스토어입니다.
// - accessToken, refreshToken, user, familyCode 등을 영속 저장합니다.
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type AuthUser = {
  userId: number;
  email: string;
  nickname: string;
  profileUrl: string;
  role: "ROLE_USER" | "ROLE_GUEST";
} | null;

type AuthState = {
  accessToken: string | null;
  user: AuthUser;
  refreshToken: string | null;
  familyCode: string | null;
  welcomeToastShown: boolean;
  setRefreshToken: (token: string | null) => void;
  setAccessToken: (token: string | null) => void;
  setUser: (user: AuthUser & { familyCode?: string }) => void;
  setWelcomeToastShown: (shown: boolean) => void;
  setFamilyCode: (code: string | null) => void;
  clear: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      refreshToken: null,
      familyCode: null,
      welcomeToastShown: false,

      setRefreshToken: (token) => set({ refreshToken: token }),
      setAccessToken: (token) => set({ accessToken: token }),

      // 유저 정보와 함께 전달되는 familyCode를 분리해 저장합니다.
      setUser: (userWithFamilyCode) => {
        if (userWithFamilyCode) {
          const { familyCode, ...userWithoutFamilyCode } = userWithFamilyCode;
          set({
            user: userWithoutFamilyCode,
            familyCode: familyCode || null,
            welcomeToastShown: false,
          });
        } else {
          set({ user: null, familyCode: null, welcomeToastShown: false });
        }
      },

      setWelcomeToastShown: (shown) => set({ welcomeToastShown: shown }),
      setFamilyCode: (code) => set({ familyCode: code }),

      // 로그아웃 등 저장된 인증 상태를 초기화합니다.
      clear: () =>
        set({
          refreshToken: null,
          accessToken: null,
          user: null,
          familyCode: null,
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
        familyCode: state.familyCode,
        welcomeToastShown: state.welcomeToastShown,
      }),
    }
  )
);
