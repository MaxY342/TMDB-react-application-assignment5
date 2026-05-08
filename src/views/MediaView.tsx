import { FaCalendarAlt } from "react-icons/fa";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { LinkGroup, Modal } from "@/components";
import { IMAGE_BASE_URL, type MediaResponse, MOVIE_ENDPOINT, ORIGINAL_IMAGE_BASE_URL, TV_ENDPOINT } from "@/core";
import { useTmdb } from "@/hooks";

export const MediaView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const { data } = useTmdb<MediaResponse>(`${location.pathname.includes("/movies") ? MOVIE_ENDPOINT : TV_ENDPOINT}/${id}`, {
    append_to_response: "videos",
  });

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <Modal onClick={() => navigate(-1)}>
      <div className="flex h-full min-h-0 flex-col">
        <div
          className="h-[420px] shrink-0 rounded-2xl bg-center bg-cover"
          style={{
            backgroundImage: `url(${ORIGINAL_IMAGE_BASE_URL}${data.backdrop_path})`,
          }}
        />
        <div className="flex min-h-0 flex-1 gap-5 p-5">
          <img
            alt={data.title || data.name}
            className="h-[330px] w-[220px] shrink-0 rounded-xl object-cover"
            src={`${IMAGE_BASE_URL}${data.poster_path}`}
          />
          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto pr-2">
            <h1 className="font-bold text-3xl">{data.title || data.name}</h1>
            <p className="flex items-center gap-2 text-gray-400">
              <FaCalendarAlt />
              {data.release_date || data.first_air_date}
            </p>
            <p className="text-gray-300">{data.overview}</p>
            {location.pathname.includes("/movies") ? (
              <LinkGroup
                options={[
                  { label: "Credits", to: "credits" },
                  { label: "Trailers", to: "trailers" },
                  { label: "Reviews", to: "reviews" },
                ]}
              />
            ) : (
              <LinkGroup
                options={[
                  { label: "Seasons", to: "seasons" },
                  { label: "Credits", to: "credits" },
                  { label: "Trailers", to: "trailers" },
                  { label: "Reviews", to: "reviews" },
                ]}
              />
            )}
            <div className="pt-4">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
