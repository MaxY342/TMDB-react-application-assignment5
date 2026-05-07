import { ImageGrid, Pagination, LinkGroup } from "@/components";
import { type MediaListResponse, TV_ENDPOINT } from "@/core";
import { useTmdb } from "@/hooks";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const TelevisionView = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const { listType = "airing_today" } = useParams();
  const { data } = useTmdb<MediaListResponse>(
    `${TV_ENDPOINT}/${listType}`,
    { page },
    [page, listType],
  );

  const gridData = (data?.results ?? []).map((result) => ({
    id: result.id || 0,
    imagePath: result.poster_path || null,
    primaryText: result.name || "",
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="max-w-[1200px] mx-auto p-5 space-y-5">
      <LinkGroup
        options={[
          { label: "Airing Today", to: "/tv/category/airing_today" },
          { label: "On The Air", to: "/tv/category/on_the_air" },
          { label: "Popular", to: "/tv/category/popular" },
          { label: "Top Rated", to: "/tv/category/top_rated" },
        ]}
      />
      <ImageGrid
        results={gridData}
        onClick={(id) => navigate(`/tv/${id}/seasons`)}
      />
      <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
    </section>
  );
};
