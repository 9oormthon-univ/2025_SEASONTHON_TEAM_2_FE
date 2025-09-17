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
