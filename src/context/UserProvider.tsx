import type { ReactNode } from "react";
import { UserContext } from "@/context";

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  return <UserContext.Provider value={undefined}>{children}</UserContext.Provider>;
};
