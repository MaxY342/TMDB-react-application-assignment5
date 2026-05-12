import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ImageGrid, LinkGroup, Pagination } from "@/components";
import { IMAGE_BASE_URL, MOVIE_ENDPOINT, type MoviesResponse } from "@/core";
import { useTmdb } from "@/hooks";

export const MoviesView = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const { listType = "now_playing" } = useParams();
  const { data } = useTmdb<MoviesResponse>(`${MOVIE_ENDPOINT}/${listType}`, { page });

  const gridData = (data?.results ?? []).map((result) => ({
    id: result.id,
    imageUrl: `${IMAGE_BASE_URL}${result.poster_path}`,
    primaryText: result.original_title,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="mx-auto max-w-[1200px] space-y-5 p-5">
      <LinkGroup
        options={[
          { label: "NowPlaying", to: "/movies/category/now_playing" },
          { label: "Popular", to: "/movies/category/popular" },
          { label: "Top Rated", to: "/movies/category/top_rated" },
          { label: "Upcoming", to: "/movies/category/upcoming" },
        ]}
      />
      <ImageGrid images={gridData} onClick={(id) => navigate(`/movies/${id}/credits`)} />
      <Pagination maxPages={data.total_pages} onClick={setPage} page={page} />
    </section>
  );
};
