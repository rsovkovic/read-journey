import { AuthResponse } from '@/app/api/auth';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthState {
  user: AuthResponse | null;
  isLoggedIn: boolean;
  setLogin: (userData: AuthResponse) => void;
  setLogout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      setLogin: (userData) => set({ user: userData, isLoggedIn: true }),
      setLogout: () => set({ user: null, isLoggedIn: false }),
    }),
    {
      name: 'read-journey-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
