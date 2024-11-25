import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, getAuthToken, removeAuthToken } from '../api/authApi';

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  isAuthenticated: false,
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const token = getAuthToken();
    const savedUser = localStorage.getItem('user');
    return token && savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const logout = () => {
    setUser(null);
    removeAuthToken();
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      isAuthenticated: !!user,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);