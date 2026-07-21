import { create } from 'zustand';

export type UserRole = 'patient' | 'receptionist' | 'doctor' | 'pharmacist' | 'ops-manager' | 'hospital-director' | 'county-director';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  hospitalSlug?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  login: (user, token) => set({ user, token, isAuthenticated: true }),
  logout: () => set({ user: null, token: null, isAuthenticated: false }),
  updateUser: (updates) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...updates } : null,
    })),
}));
