import { ImageGrid, Pagination, LinkGroup } from "@/components";
import { type GenresResponse, type MediaListResponse, DISCOVER_ENDPOINT, GENRE_ENDPOINT } from "@/core";
import { useTmdb } from "@/hooks";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const GenreView = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const { mediaType = "movies", genreId = "0" } = useParams();
  const { data: genresData } = useTmdb<GenresResponse>(
    `${GENRE_ENDPOINT}/${mediaType == "movies" ? "movie" : "tv"}/list`,
    {},
    [mediaType],
  );
  const genres = genresData?.genres ?? [];
  const { data } = useTmdb<MediaListResponse>(
    `${DISCOVER_ENDPOINT}/${mediaType == "movies" ? "movie" : "tv"}`,
    { page, with_genres: genreId },
    [page, genreId, mediaType],
  );

  const gridData = (data?.results ?? []).map((result) => ({
    id: result.id || 0,
    imagePath: result.poster_path || null,
    primaryText: result.original_title || result.name || "",
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="max-w-[1200px] mx-auto p-5 space-y-5">
      <LinkGroup
        options={[
          {
            label: "Movies",
            to: "/genre/movies/28",
            match: ["/genre/movies/:genreId"],
          },
          { label: "TV", to: "/genre/tv/10759", match: ["/genre/tv/:genreId"] },
        ]}
      />
      <LinkGroup
        options={genres.map((g) => ({
          label: g.name,
          to: `/genre/${mediaType}/${g.id}`,
          match: [`/genre/${mediaType}/${g.id}`],
        }))}
      />
      <ImageGrid
        results={gridData}
        onClick={(id) =>
          navigate(
            `/${mediaType}/${id}/${mediaType == "movies" ? "credits" : "seasons"}`,
          )
        }
      />
      <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
    </section>
  );
};
