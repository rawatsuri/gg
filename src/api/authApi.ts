import { API_BASE_URL, handleResponse } from './config';

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login failed');
  }
  
  return response.json();
};

export const register = (name: string, email: string, password: string) =>
  fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  }).then(handleResponse);

export const getAuthToken = () => localStorage.getItem('authToken');

export const setAuthToken = (token: string) => localStorage.setItem('authToken', token);

export const removeAuthToken = () => localStorage.removeItem('authToken');