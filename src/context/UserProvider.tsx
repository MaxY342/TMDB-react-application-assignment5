import { type ReactNode, useEffect } from "react";
import { UserContext } from "@/context";
import { FAVORITES_KEY, GENRE_ENDPOINT, type GenresResponse, type ImageCell, USERNAME_KEY } from "@/core";
import { useLocalStorage, useTmdb } from "@/hooks";

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const { data: movieGenresData } = useTmdb<GenresResponse>(`${GENRE_ENDPOINT}/movie/list`, {});
  const movieGenres = movieGenresData?.genres ?? [];
  const { data: tvGenresData } = useTmdb<GenresResponse>(`${GENRE_ENDPOINT}/tv/list`, {});
  const tvGenres = tvGenresData?.genres ?? [];
  const [userName, setUserName] = useLocalStorage<string, string>(USERNAME_KEY, "User");
  const [favorites, setFavorites] = useLocalStorage<Map<number, ImageCell>, [number, ImageCell][]>(FAVORITES_KEY, new Map(), {
    deserialize: (entries) => new Map(entries),
    serialize: (map) => Array.from(map.entries()),
  });
  const [cart, setCart] = useLocalStorage<Map<number, ImageCell>, [number, ImageCell][]>("@cart", new Map(), {
    deserialize: (entries) => new Map(entries),
    serialize: (map) => Array.from(map.entries()),
  });
  const [moviePreferences, setMoviePreferences] = useLocalStorage<Set<number>, number[]>("@moviePreferences", new Set(), {
    deserialize: (entries) => new Set(entries),
    serialize: (set) => Array.from(set),
  });
  const [tvPreferences, setTvPreferences] = useLocalStorage<Set<number>, number[]>("@tvPreferences", new Set(), {
    deserialize: (entries) => new Set(entries),
    serialize: (set) => Array.from(set),
  });

  useEffect(() => {
    if (movieGenres.length > 0 && moviePreferences.size === 0) {
      setMoviePreferences(new Set(movieGenres.map((g) => g.id)));
    }
    if (tvGenres.length > 0 && tvPreferences.size === 0) {
      setTvPreferences(new Set(tvGenres.map((g) => g.id)));
    }
  }, [movieGenres, moviePreferences.size, setMoviePreferences, tvGenres, tvPreferences.size, setTvPreferences]);

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

  const clearMovieFavorites = () => {
    setFavorites((prev) => {
      const cloned = new Map(prev);
      Array.from(cloned.values()).forEach((fav) => {
        if (fav.mediaType === "movie") {
          cloned.delete(fav.id);
        }
      });
      return cloned;
    });
  };

  const clearTvFavorites = () => {
    setFavorites((prev) => {
      const cloned = new Map(prev);
      Array.from(cloned.values()).forEach((fav) => {
        if (fav.mediaType === "tv") {
          cloned.delete(fav.id);
        }
      });
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

  const clearCart = () => {
    setCart(new Map());
  };

  const toggleMoviePreference = (genreId: number) => {
    setMoviePreferences((prev) => {
      const cloned = new Set(prev);

      if (cloned.has(genreId)) {
        if (cloned.size === 1) {
          return prev;
        }

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
        if (cloned.size === 1) {
          return prev;
        }

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
        clearCart,
        clearMovieFavorites,
        clearTvFavorites,
        favorites,
        movieGenres,
        moviePreferences,
        setUserName,
        toggleCart,
        toggleFavorite,
        toggleMoviePreference,
        toggleTvPreference,
        tvGenres,
        tvPreferences,
        userName,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
