'use client';

import { createContext, useContext, ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

interface AuthContextProviderProps {
  children: ReactNode;
}

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default function AuthProvider({ children }: AuthContextProviderProps) {
  return (
    <SessionProvider>
      <AuthContext.Provider value={{}}>
        {children}
      </AuthContext.Provider>
    </SessionProvider>
  );
}
