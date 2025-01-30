import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { IUser } from "@/types/user";

interface IUserState {
  user: IUser | null;
  setUser: (newUser: IUser) => void;
}

export const useUserStore = create<IUserState>()(
  devtools((set) => ({
    user: null,
    setUser: (newUser) => set(() => ({ user: newUser })),
  }))
);
