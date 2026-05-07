import { ButtonGroup, ImageGrid, LinkGroup, Pagination } from "@/components";
import { type MediaListResponse, TRENDING_ENDPOINT } from "@/core";
import { useTmdb } from "@/hooks";
import { useState } from "react";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";

export const TrendingView = () => {
  const navigate = useNavigate();
  const { mediaType = "movies" } = useParams();
  const [page, setPage] = useState<number>(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const interval = searchParams.get("interval") || "day";

  const { data } = useTmdb<MediaListResponse>(
    `${TRENDING_ENDPOINT}/${mediaType == "movies" ? "movie" : "tv"}/${interval}`,
    { page, time_window: interval },
    [page, interval, mediaType],
  );

  const gridData = (data?.results ?? []).map((result) => ({
    id: result.id || 0,
    imagePath: result.poster_path || "",
    primaryText: result.original_title || result.name || "",
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="max-w-[1200px] mx-auto p-5 space-y-5">
      <div className="flex items-center justify-between mb-4">
        <ButtonGroup
          value={interval}
          options={[
            { label: "Today", value: "day" },
            { label: "Week", value: "week" },
          ]}
          onClick={(value) => {
            setSearchParams({ interval: value });
          }}
        />
        <LinkGroup
          options={[
            { label: "Movies", to: "/trending/movies" },
            { label: "TV Shows", to: "/trending/tv" },
          ]}
        />
      </div>
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
