import { useNavigate, useParams } from "react-router-dom";
import { ImageGrid } from "@/components";
import { type CreditsResponse, MOVIE_ENDPOINT } from "@/core";
import { useTmdb } from "@/hooks";

export const CreditsView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useTmdb<CreditsResponse>(`${MOVIE_ENDPOINT}/${id}/credits`, {});

  const gridData = (data?.cast ?? []).map((result) => ({
    id: result.id,
    imageUrl: result.profile_path || "",
    primaryText: result.name,
    secondaryText: result.character,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="p-5">
      <h2 className="mb-6 font-bold text-2xl">Credits</h2>
      {data.cast.length ? (
        <ImageGrid images={gridData} onClick={(id) => navigate(`/people/${id}/career`)} />
      ) : (
        <p className="text-center text-gray-400">No credits available.</p>
      )}
    </section>
  );
};
