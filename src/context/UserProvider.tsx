import { UserContext } from '@/context';
import { type ReactNode } from 'react';

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  return <UserContext.Provider value={undefined}>{children}</UserContext.Provider>;
};
