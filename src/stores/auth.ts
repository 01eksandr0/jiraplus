import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface IAuthState {
  token: string;
  setToken: (newToken: string) => void;
}

export const useAuthStore = create<IAuthState>()(
  devtools(
    persist(
      (set) => ({
        token: "",
        setToken: (newToken) => set(() => ({ token: newToken })),
      }),
      { name: "token" }
    )
  )
);
