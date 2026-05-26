import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { ImageGrid, ImageOverlay } from "@/components";
import { calculatePrice, cartAction, favoriteAction, IMAGE_BASE_URL, type ImageCell, type MediaResponse, TV_ENDPOINT } from "@/core";
import { useTmdb, useUserContext } from "@/hooks";

export const SeasonsView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = useTmdb<MediaResponse>(`${TV_ENDPOINT}/${id}`, {});
  const { favorites, toggleFavorite, cart, toggleCart } = useUserContext();

  const gridData: ImageCell[] = (data?.seasons ?? []).map((result) => ({
    id: result.id,
    imageUrl: result.poster_path ? `${IMAGE_BASE_URL}${result.poster_path}` : "",
    mediaType: "tv",
    primaryText: result.name,
    seasonNumber: result.season_number,
    secondaryText: `$${calculatePrice(result.air_date)}`,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return location.pathname === `/tv/${id}/seasons` ? (
    <section className="p-5">
      <h2 className="mb-6 font-bold text-2xl">Seasons</h2>
      {data.seasons?.length ? (
        <ImageGrid
          images={gridData}
          onClick={(image) => navigate(`${location.pathname}/${gridData.find((s) => s.id === image.id)?.seasonNumber}`)}
        >
          {(image) => (
            <div>
              <ImageOverlay actions={[favoriteAction((image: ImageCell) => favorites.has(image.id), toggleFavorite)]} image={image} />
              <ImageOverlay actions={[cartAction((image: ImageCell) => cart.has(image.id), toggleCart)]} image={image} />
            </div>
          )}
        </ImageGrid>
      ) : (
        <p className="text-center text-gray-400">No seasons available.</p>
      )}
    </section>
  ) : (
    <Outlet />
  );
};
