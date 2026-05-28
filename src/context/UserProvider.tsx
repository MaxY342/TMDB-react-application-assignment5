import type { ReactNode } from "react";
import { UserContext } from "@/context";
import { FAVORITES_KEY, GENRE_ENDPOINT, type GenresResponse, type ImageCell, USERNAME_KEY } from "@/core";
import { useLocalStorage, useTmdb } from "@/hooks";

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const { data: movieGenresData } = useTmdb<GenresResponse>(`${GENRE_ENDPOINT}/movie/list`, {});
  const movieGenres = movieGenresData?.genres ?? [];
  const movieGenresSet = new Set(movieGenres.map((genre) => genre.id));
  console.log(movieGenresSet);
  const { data: tvGenresData } = useTmdb<GenresResponse>(`${GENRE_ENDPOINT}/tv/list`, {});
  const tvGenres = tvGenresData?.genres ?? [];
  const tvGenresSet = new Set(tvGenres.map((genre) => genre.id));
  console.log(tvGenresSet);
  const [userName, setUserName] = useLocalStorage<string, string>(USERNAME_KEY, "User");
  const [favorites, setFavorites] = useLocalStorage<Map<number, ImageCell>, [number, ImageCell][]>(FAVORITES_KEY, new Map(), {
    deserialize: (entries) => new Map(entries),
    serialize: (map) => Array.from(map.entries()),
  });
  const [cart, setCart] = useLocalStorage<Map<number, ImageCell>, [number, ImageCell][]>("@cart", new Map(), {
    deserialize: (entries) => new Map(entries),
    serialize: (map) => Array.from(map.entries()),
  });
  const [moviePreferences, setMoviePreferences] = useLocalStorage<Set<number>, number[]>("@moviePreferences", movieGenresSet, {
    deserialize: (entries) => new Set(entries),
    serialize: (set) => Array.from(set),
  });
  const [tvPreferences, setTvPreferences] = useLocalStorage<Set<number>, number[]>("@tvPreferences", tvGenresSet, {
    deserialize: (entries) => new Set(entries),
    serialize: (set) => Array.from(set),
  });

  const toggleFavorite = (image: ImageCell) => {
    setFavorites((prev) => {
      const cloned = new Map(prev);

      if (cloned.has(image.id)) {
        cloned.delete(image.id);
      } else {
        cloned.set(image.id, image);
      }

      return cloned;
    });
    setCart((prev) => {
      const cloned = new Map(prev);

      if (cloned.has(image.id)) {
        cloned.delete(image.id);
      }

      return cloned;
    });
  };

  const toggleCart = (image: ImageCell) => {
    setCart((prev) => {
      const cloned = new Map(prev);

      if (cloned.has(image.id)) {
        cloned.delete(image.id);
      } else {
        cloned.set(image.id, image);
      }

      return cloned;
    });
    setFavorites((prev) => {
      const cloned = new Map(prev);

      if (cloned.has(image.id)) {
        cloned.delete(image.id);
      }

      return cloned;
    });
  };

  const toggleMoviePreference = (genreId: number) => {
    setMoviePreferences((prev) => {
      const cloned = new Set(prev);

      if (cloned.has(genreId)) {
        cloned.delete(genreId);
      } else {
        cloned.add(genreId);
      }

      return cloned;
    });
  };

  const toggleTvPreference = (genreId: number) => {
    setTvPreferences((prev) => {
      const cloned = new Set(prev);

      if (cloned.has(genreId)) {
        cloned.delete(genreId);
      } else {
        cloned.add(genreId);
      }

      return cloned;
    });
  };

  return (
    <UserContext.Provider
      value={{
        cart,
        favorites,
        moviePreferences,
        setUserName,
        toggleCart,
        toggleFavorite,
        toggleMoviePreference,
        toggleTvPreference,
        tvPreferences,
        userName,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
