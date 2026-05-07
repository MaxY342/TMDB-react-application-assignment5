import { ImageGrid } from "@/components";
import { type MediaResponse, TV_ENDPOINT } from "@/core";
import { useTmdb } from "@/hooks";
import { useParams, useNavigate, useLocation, Outlet } from "react-router-dom";

export const SeasonsView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = useTmdb<MediaResponse>(`${TV_ENDPOINT}/${id}`, {}, [id]);

  const gridData = (data?.seasons ?? []).map((result) => ({
    id: result.id,
    imagePath: result.poster_path,
    primaryText: result.name,
    secondaryText: result.air_date,
    season_number: result.season_number,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return location.pathname == `/tv/${id}/seasons` ? (
    <section className="p-5">
      <h2 className="text-2xl font-bold mb-6">Seasons</h2>
      {data.seasons?.length ? (
        <ImageGrid
          results={gridData}
          onClick={(id) =>
            navigate(
              `${location.pathname}/${gridData.find((s) => s.id === id)?.season_number}`,
            )
          }
        />
      ) : (
        <p className="text-gray-400 text-center">No seasons available.</p>
      )}
    </section>
  ) : (
    <Outlet />
  );
};
