import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { ImageGrid } from "@/components";
import { IMAGE_BASE_URL, type ImageCell, type MediaResponse, TV_ENDPOINT } from "@/core";
import { useTmdb } from "@/hooks";

export const SeasonsView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = useTmdb<MediaResponse>(`${TV_ENDPOINT}/${id}`, {});

  const gridData: ImageCell[] = (data?.seasons ?? []).map((result) => ({
    id: result.id,
    imageUrl: result.poster_path ? `${IMAGE_BASE_URL}${result.poster_path}` : "",
    primaryText: result.name,
    seasonNumber: result.season_number,
    secondaryText: result.air_date,
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
        />
      ) : (
        <p className="text-center text-gray-400">No seasons available.</p>
      )}
    </section>
  ) : (
    <Outlet />
  );
};
