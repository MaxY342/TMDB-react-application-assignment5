import { ImageGrid } from "@/components";
import { PERSON_ENDPOINT, type PersonResponse } from "@/core";
import { useTmdb } from "@/hooks";
import { useParams, useNavigate } from "react-router-dom";

export const CareerView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useTmdb<PersonResponse>(
    `${PERSON_ENDPOINT}/${id}`,
    { append_to_response: "combined_credits" },
    [id],
  );

  const gridData = (data?.combined_credits?.cast ?? []).map((result) => ({
    id: result.id,
    uniqueId: `${String(result.id)}-${result.poster_path}-${result.character}`,
    imagePath: result.poster_path,
    primaryText: result.title,
    secondaryText: result.character,
    media_type: result.media_type,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="p-5">
      <h2 className="text-2xl font-bold mb-6">Career</h2>
      {data.combined_credits?.cast.length ? (
        <ImageGrid
          results={gridData}
          onClick={(id) => {
            const entry = gridData.find((item) => item.id === id);
            if (entry) {
              navigate(
                `/${entry.media_type == "movie" ? "movies" : "tv"}/${id}/${entry.media_type == "movie" ? "credits" : "seasons"}`,
              );
            }
          }}
        />
      ) : (
        <p className="text-gray-400 text-center">
          No career entries available.
        </p>
      )}
    </section>
  );
};
