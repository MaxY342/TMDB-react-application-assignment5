import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ImageGrid, Pagination } from "@/components";
import { type MediaListResponse, SEARCH_ENDPOINT } from "@/core";
import { useDebounce, useTmdb } from "@/hooks";

export const SearchView = () => {
  const [page, setPage] = useState<number>(1);
  const [searchParams] = useSearchParams();
  const searchType = searchParams.get("searchType");
  const query = searchParams.get("query");
  const debouncedQuery = useDebounce(query, 500);
  const navigate = useNavigate();
  const { data } = useTmdb<MediaListResponse>(`${SEARCH_ENDPOINT}/${searchType}`, { page, query: debouncedQuery });

  useEffect(() => {
    setPage(1);
  }, []);

  const gridData = (data?.results ?? []).map((result) => ({
    id: result.id,
    imageUrl: result.profile_path || result.poster_path || "",
    primaryText: result.name || result.original_title || "",
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="mx-auto max-w-[1200px] space-y-5 p-10">
      <ImageGrid
        images={gridData}
        onClick={(id) =>
          navigate(
            `/${searchType === "movie" ? "movies" : searchType === "tv" ? "tv" : "people"}/${id}/${searchType === "movie" ? "credits" : searchType === "tv" ? "seasons" : "career"}`,
          )
        }
      />
      {data.results.length ? (
        <Pagination maxPages={data.total_pages} onClick={setPage} page={page} />
      ) : (
        <p className="text-center text-gray-400">No search results found</p>
      )}
    </section>
  );
};
