import { useNavigate } from "react-router-dom";
import { ImageGrid, ImageOverlay } from "@/components";
import { cartAction, favoriteAction, type ImageCell } from "@/core";
import { useUserContext } from "@/hooks";

export const FavoritesView = () => {
  const navigate = useNavigate();
  const { cart, favorites, toggleCart, toggleFavorite } = useUserContext();

  return (
    <section className="mx-auto max-w-7xl space-y-5 p-5">
      <h1 className="font-bold text-3xl">Favorites</h1>
      {favorites.size === 0 ? (
        <p className="mt-10 text-gray-400">You have no favorites yet.</p>
      ) : (
        <ImageGrid images={Array.from(favorites.values())} onClick={(image) => navigate(`/movies/${image.id}/credits`)}>
          {(image) => (
            <ImageOverlay
              actions={[
                favoriteAction((image: ImageCell) => favorites.has(image.id), toggleFavorite),
                cartAction((image: ImageCell) => cart.has(image.id), toggleCart),
              ]}
              image={image}
            />
          )}
        </ImageGrid>
      )}
    </section>
  );
};
