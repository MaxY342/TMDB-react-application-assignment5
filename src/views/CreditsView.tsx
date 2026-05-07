import { ImageGrid } from "@/components";
import { type CreditsResponse, MOVIE_ENDPOINT } from "@/core";
import { useTmdb } from "@/hooks";
import { useParams, useNavigate } from "react-router-dom";

export const CreditsView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useTmdb<CreditsResponse>(
    `${MOVIE_ENDPOINT}/${id}/credits`,
    {},
    [],
  );

  const gridData = (data?.cast ?? []).map((result) => ({
    id: result.id,
    imagePath: result.profile_path,
    primaryText: result.name,
    secondaryText: result.character,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="p-5">
      <h2 className="text-2xl font-bold mb-6">Credits</h2>
      {data.cast.length ? (
        <ImageGrid
          results={gridData}
          onClick={(id) => navigate(`/people/${id}/career`)}
        />
      ) : (
        <p className="text-gray-400 text-center">No credits available.</p>
      )}
    </section>
  );
};
