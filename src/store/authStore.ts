import { create } from 'zustand';
import { AuthState } from '../types/auth';

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  setLoading: (loading) => set({ loading }),
  logout: () => set({ user: null, token: null, isAuthenticated: false }),
}));

export default useAuthStore;