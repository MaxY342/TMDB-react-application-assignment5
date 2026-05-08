import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { ImageGrid } from "@/components";
import { type MediaResponse, TV_ENDPOINT } from "@/core";
import { useTmdb } from "@/hooks";

export const SeasonsView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = useTmdb<MediaResponse>(`${TV_ENDPOINT}/${id}`, {}, [id]);

  const gridData = (data?.seasons ?? []).map((result) => ({
    id: result.id,
    imagePath: result.poster_path,
    primaryText: result.name,
    season_number: result.season_number,
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
          onClick={(id) => navigate(`${location.pathname}/${gridData.find((s) => s.id === id)?.season_number}`)}
          results={gridData}
        />
      ) : (
        <p className="text-center text-gray-400">No seasons available.</p>
      )}
    </section>
  ) : (
    <Outlet />
  );
};
