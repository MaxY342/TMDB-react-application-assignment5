import { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { ButtonGroup, LinkGroup, SearchBar, SideBar } from "@/components";

export const Header = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    searchType: "movie",
  });
  const [searchType, setSearchType] = useState("movie");
  const query = searchParams.get("query") || "";
  const location = useLocation();
  const navigate = useNavigate();
  const onSearch = (query: string) => {
    navigate({
      pathname: "/search",
      search: `?query=${encodeURIComponent(query)}&searchType=${searchType}`,
    });
  };
  return (
    <header>
      <nav className="flex justify-between bg-gray-800 p-4">
        <div className="flex items-center gap-4">
          <SideBar />
          <h1 className="font-bold text-2xl text-white-900">TMDB Explorer</h1>
          <LinkGroup
            options={[
              {
                label: "Movies",
                match: [
                  "/movies/category/now_playing",
                  "/movies/category/popular",
                  "/movies/category/top_rated",
                  "/movies/category/upcoming",
                ],
                to: "/movies/category/now_playing",
              },
              {
                label: "TV",
                match: ["/tv/category/airing_today", "/tv/category/on_the_air", "/tv/category/popular", "/tv/category/top_rated"],
                to: "/tv/category/airing_today",
              },
              {
                label: "Trending",
                match: ["/trending/movies", "/trending/tv"],
                to: "/trending/movies",
              },
              {
                label: "Genres",
                match: ["/genre/movies/:genreId", "/genre/tv/:genreId"],
                to: "/genre/movies/28",
              },
            ]}
          />
        </div>
        <div className="flex items-center gap-4">
          <SearchBar onChange={(value) => onSearch(value)} value={query} />
          <ButtonGroup
            onClick={(value) => {
              setSearchType(value);
              if (location.pathname === "/search") {
                setSearchParams({ query, searchType: value });
              }
            }}
            options={[
              { label: "Movies", value: "movie" },
              { label: "TV", value: "tv" },
              { label: "Person", value: "person" },
            ]}
            value={searchType}
          />
        </div>
      </nav>
    </header>
  );
};
