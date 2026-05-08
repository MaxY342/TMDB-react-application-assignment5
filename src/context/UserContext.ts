import { createContext } from "react";

export type UserContextType = undefined;

export const UserContext = createContext<UserContextType | undefined>(undefined);
