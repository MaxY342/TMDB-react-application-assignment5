import { createContext } from "react";
import type { ImageCell } from "@/core";

export type UserContextType = {
  userName: string;
  favorites: Map<number, ImageCell>;
  cart: Map<number, ImageCell>;
  moviePreferences: Set<number>;
  tvPreferences: Set<number>;
  toggleMoviePreference: (genreId: number) => void;
  toggleTvPreference: (genreId: number) => void;
  setUserName: (userName: string) => void;
  toggleFavorite: (image: ImageCell) => void;
  toggleCart: (image: ImageCell) => void;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);
