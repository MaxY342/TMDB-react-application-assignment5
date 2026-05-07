import { ImageGrid, Pagination } from "@/components";
import { type MediaListResponse, SEARCH_ENDPOINT } from "@/core";
import { useDebounce, useTmdb } from "@/hooks";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export const SearchView = () => {
  const [page, setPage] = useState<number>(1);
  const [searchParams] = useSearchParams();
  const searchType = searchParams.get("searchType");
  const query = searchParams.get("query");
  const debouncedQuery = useDebounce(query, 500);
  const navigate = useNavigate();
  const { data } = useTmdb<MediaListResponse>(
    `${SEARCH_ENDPOINT}/${searchType}`,
    { query: debouncedQuery, page },
    [debouncedQuery, page, searchType],
  );

  useEffect(() => {
    setPage(1);
  }, [debouncedQuery]);

  const gridData = (data?.results ?? []).map((result) => ({
    id: result.id,
    imagePath: result.profile_path || result.poster_path || null,
    primaryText: result.name || result.original_title || "",
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="max-w-[1200px] mx-auto p-10 space-y-5">
      <ImageGrid
        results={gridData}
        onClick={(id) =>
          navigate(
            `/${searchType == "movie" ? "movies" : searchType == "tv" ? "tv" : "people"}/${id}/${searchType == "movie" ? "credits" : searchType == "tv" ? "seasons" : "career"}`,
          )
        }
      />
      {data.results.length ? (
        <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
      ) : (
        <p className="text-center text-gray-400">No search results found</p>
      )}
    </section>
  );
};
