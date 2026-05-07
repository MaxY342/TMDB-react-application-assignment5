import { type MediaResponse, MOVIE_ENDPOINT, TV_ENDPOINT } from "@/core";
import { useTmdb } from "@/hooks";
import { useParams } from "react-router-dom";

export const TrailersView = () => {
  const { id } = useParams();
  const { data } = useTmdb<MediaResponse>(
    `${location.pathname.includes("/movies") ? MOVIE_ENDPOINT : TV_ENDPOINT}/${id}`,
    { append_to_response: "videos" },
    [id],
  );

  let trailerVideos = data?.videos?.results.filter(
    (video) =>
      video.site === "YouTube" &&
      video.type === "Trailer" &&
      video.name?.toLowerCase().includes("official"),
  );

  if (trailerVideos && trailerVideos.length < 1) {
    trailerVideos = data?.videos?.results.filter(
      (video) => video.site === "YouTube" && video.type === "Trailer",
    );
  }

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="space-y-4 p-5">
      <h2 className="text-2xl font-bold">Trailers</h2>
      {trailerVideos && (
        <div className="aspect-video w-[50%]">
          {trailerVideos.map((element) => (
            <iframe
              key={element.key}
              className="w-full h-full rounded-xl"
              src={`https://www.youtube.com/embed/${element.key}`}
              title="Movie Trailer"
              allowFullScreen
            />
          ))}
        </div>
      )}
    </section>
  );
};
