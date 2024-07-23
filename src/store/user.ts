import { redirect } from 'next/navigation';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IUser {
  username: string;
}

export const useAuth = create(
  persist<{
    user: IUser | null;
    setUser: (user: IUser) => void;
    logOut: () => void;
  }>(
    (set, get) => ({
      user: null,
      setUser: (user: IUser) => set({ user: user }),
      logOut: () => {
        set({ user: null });
        redirect('/login');
      },
    }),
    { name: 'user' },
  ),
);
