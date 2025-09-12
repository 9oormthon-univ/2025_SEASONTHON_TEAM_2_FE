import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type AuthUser = {
  userId: number;
  email: string;
  familyCode: string;
  nickname: string;
  profileUrl: string;
  role: "ROLE_USER" | "ROLE_GUEST";
} | null;

type AuthState = {
  accessToken: string | null;
  user: AuthUser;
  refreshToken: string | null;
  setRefreshToken: (token: string | null) => void;
  setAccessToken: (token: string | null) => void;
  setUser: (user: AuthUser) => void;
  clear: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      refreshToken: null,
      setRefreshToken: (token) => set({ refreshToken: token }),
      setAccessToken: (token) => set({ accessToken: token }),
      setUser: (user) => set({ user }),
      clear: () => set({ refreshToken: null, accessToken: null, user: null }),
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        refreshToken: state.refreshToken,
        accessToken: state.accessToken,
        user: state.user,
      }),
    }
  )
);
