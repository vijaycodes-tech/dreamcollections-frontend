import React, { createContext, useContext, useState, ReactNode } from 'react';
import { loginApi, signupApi } from '../api';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

interface AuthContextType {
  auth: AuthState;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: Omit<User, 'id'> & { password: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
  });

  const login = async (email: string, password: string) => {
    const resp = await loginApi({ username: email, password });
    const user: User = { id: email, name: email, email };
    setAuth({ user, token: resp.token, isAuthenticated: true });
  };

  const logout = () => {
    setAuth({ user: null, token: null, isAuthenticated: false });
  };

  const register = async (data: Omit<User, 'id'> & { password: string }) => {
    await signupApi({
      username: data.email,
      password: data.password,
      email: data.email,
      phone: data.phone,
    });
    await login(data.email, data.password);
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};