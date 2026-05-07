import { ImageGrid, Pagination, LinkGroup } from "@/components";
import { type MoviesResponse, MOVIE_ENDPOINT } from "@/core";
import { useTmdb } from "@/hooks";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const MoviesView = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const { listType = "now_playing" } = useParams();
  const { data } = useTmdb<MoviesResponse>(
    `${MOVIE_ENDPOINT}/${listType}`,
    { page },
    [page, listType],
  );

  const gridData = (data?.results ?? []).map((result) => ({
    id: result.id,
    imagePath: result.poster_path,
    primaryText: result.original_title,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="max-w-[1200px] mx-auto p-5 space-y-5">
      <LinkGroup
        options={[
          { label: "NowPlaying", to: "/movies/category/now_playing" },
          { label: "Popular", to: "/movies/category/popular" },
          { label: "Top Rated", to: "/movies/category/top_rated" },
          { label: "Upcoming", to: "/movies/category/upcoming" },
        ]}
      />
      <ImageGrid
        results={gridData}
        onClick={(id) => navigate(`/movies/${id}/credits`)}
      />
      <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
    </section>
  );
};
