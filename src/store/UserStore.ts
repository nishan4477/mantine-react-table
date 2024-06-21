import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  _id: string;
  username: string;
  email: "string";
  fullName: string;
  avatar: "string";
  coverImage: "string";
  watchHistory: [] | string[];
  createdAt: "string";
  updatedAt: "string";
  __v: number;
}
interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  accessToken: string | null;
  setAccessToken: (accessToken: string) => void;
}

export const userUserData = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      setAccessToken: (accessToken) =>
        set(() => ({ accessToken: accessToken })),
      setUser: (user) => set(() => ({ user: user })),
      clearUser: () => {
        set({ user: null, accessToken: null });
        localStorage.removeItem("user-store"); // Clear persisted data from localStorage
      },
    }),
    {
      name: "user-data", // unique name
      getStorage: () => localStorage, // (optional) by default, 'localStorage' is used
    },
  ),
);
