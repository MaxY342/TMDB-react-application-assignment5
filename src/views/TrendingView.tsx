import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ButtonGroup, ImageGrid, LinkGroup, Pagination } from "@/components";
import { type MediaListResponse, TRENDING_ENDPOINT } from "@/core";
import { useTmdb } from "@/hooks";

export const TrendingView = () => {
  const navigate = useNavigate();
  const { mediaType = "movies" } = useParams();
  const [page, setPage] = useState<number>(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const interval = searchParams.get("interval") || "day";

  const { data } = useTmdb<MediaListResponse>(`${TRENDING_ENDPOINT}/${mediaType === "movies" ? "movie" : "tv"}/${interval}`, {
    page,
    time_window: interval,
  });

  const gridData = (data?.results ?? []).map((result) => ({
    id: result.id || 0,
    imageUrl: result.poster_path || "",
    primaryText: result.original_title || result.name || "",
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="mx-auto max-w-[1200px] space-y-5 p-5">
      <div className="mb-4 flex items-center justify-between">
        <ButtonGroup
          onClick={(value) => {
            setSearchParams({ interval: value });
          }}
          options={[
            { label: "Today", value: "day" },
            { label: "Week", value: "week" },
          ]}
          value={interval}
        />
        <LinkGroup
          options={[
            { label: "Movies", to: "/trending/movies" },
            { label: "TV Shows", to: "/trending/tv" },
          ]}
        />
      </div>
      <ImageGrid images={gridData} onClick={(id) => navigate(`/${mediaType}/${id}/${mediaType === "movies" ? "credits" : "seasons"}`)} />
      <Pagination maxPages={data.total_pages} onClick={setPage} page={page} />
    </section>
  );
};
