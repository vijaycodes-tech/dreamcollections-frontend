import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

interface AuthContextType {
  auth: AuthState;
  login: (user: User) => void;
  logout: () => void;
  register: (userData: Omit<User, 'id'>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });

  const login = (user: User) => {
    setAuth({
      user,
      isAuthenticated: true,
    });
  };

  const logout = () => {
    setAuth({
      user: null,
      isAuthenticated: false,
    });
  };

  const register = (userData: Omit<User, 'id'>) => {
    const newUser = {
      ...userData,
      id: Date.now().toString(),
    };
    login(newUser);
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