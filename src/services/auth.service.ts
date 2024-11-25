import api from './api';
import { jwtDecode } from 'jwt-decode';
import useAuthStore from '../store/authStore';

export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password });
  const { token } = response.data;
  const user = jwtDecode(token);
  
  useAuthStore.getState().setToken(token);
  useAuthStore.getState().setUser(user);
  useAuthStore.getState().setAuthenticated(true);
  
  return user;
};

export const register = async (email: string, password: string, name: string) => {
  const response = await api.post('/auth/register', { email, password, name });
  return response.data;
};

export const completeOnboarding = async (onboardingData: any) => {
  const response = await api.post('/auth/onboarding', onboardingData);
  const updatedUser = response.data;
  useAuthStore.getState().setUser(updatedUser);
  return updatedUser;
};