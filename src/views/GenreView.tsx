import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ImageGrid, LinkGroup, Pagination } from "@/components";
import { DISCOVER_ENDPOINT, GENRE_ENDPOINT, type GenresResponse, IMAGE_BASE_URL, type MediaListResponse } from "@/core";
import { useTmdb } from "@/hooks";

export const GenreView = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const { mediaType = "movies", genreId = "0" } = useParams();
  const { data: genresData } = useTmdb<GenresResponse>(`${GENRE_ENDPOINT}/${mediaType === "movies" ? "movie" : "tv"}/list`, {});
  const genres = genresData?.genres ?? [];
  const { data } = useTmdb<MediaListResponse>(`${DISCOVER_ENDPOINT}/${mediaType === "movies" ? "movie" : "tv"}`, {
    page,
    with_genres: genreId,
  });

  const gridData = (data?.results ?? []).map((result) => ({
    id: result.id || 0,
    imageUrl: `${IMAGE_BASE_URL}${result.poster_path}` || "",
    primaryText: result.original_title || result.name || "",
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="mx-auto max-w-[1200px] space-y-5 p-5">
      <LinkGroup
        options={[
          {
            label: "Movies",
            match: "/genre/movies/:genreId",
            to: "/genre/movies/28",
          },
          { label: "TV", match: "/genre/tv/:genreId", to: "/genre/tv/10759" },
        ]}
      />
      <LinkGroup
        options={genres.map((g) => ({
          label: g.name,
          match: `/genre/${mediaType}/${g.id}`,
          to: `/genre/${mediaType}/${g.id}`,
        }))}
      />
      <ImageGrid images={gridData} onClick={(id) => navigate(`/${mediaType}/${id}/${mediaType === "movies" ? "credits" : "seasons"}`)} />
      <Pagination maxPages={data.total_pages} onClick={setPage} page={page} />
    </section>
  );
};
