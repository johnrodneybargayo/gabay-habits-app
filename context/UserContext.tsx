import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import useFirebaseData from '../hooks/useFirebaseData';

interface UserContextType {
  user: any | null;
  loading: boolean;
  error: string | null;
}

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { userData, loading, error } = useFirebaseData();
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    if (!loading && !error) {
      setUser(userData);
    }
  }, [userData, loading, error]);

  return (
    <UserContext.Provider value={{ user, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
