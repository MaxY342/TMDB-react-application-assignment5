import { LinkGroup, Modal } from "@/components";
import {
  type MediaResponse,
  IMAGE_BASE_URL,
  MOVIE_ENDPOINT,
  ORIGINAL_IMAGE_BASE_URL,
  TV_ENDPOINT,
} from "@/core";
import { useTmdb } from "@/hooks";
import { FaCalendarAlt } from "react-icons/fa";
import { Outlet, useNavigate, useParams, useLocation } from "react-router-dom";

export const MediaView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const { data } = useTmdb<MediaResponse>(
    `${location.pathname.includes("/movies") ? MOVIE_ENDPOINT : TV_ENDPOINT}/${id}`,
    { append_to_response: "videos" },
    [id],
  );

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <Modal onClick={() => navigate(-1)}>
      <div className="flex flex-col h-full min-h-0">
        <div
          className="h-[420px] bg-cover bg-center rounded-2xl shrink-0"
          style={{
            backgroundImage: `url(${ORIGINAL_IMAGE_BASE_URL}${data.backdrop_path})`,
          }}
        />
        <div className="flex flex-1 min-h-0 gap-5 p-5">
          <img
            className="w-[220px] h-[330px] object-cover rounded-xl shrink-0"
            src={`${IMAGE_BASE_URL}${data.poster_path}`}
            alt={data.title || data.name}
          />
          <div className="flex-1 min-h-0 overflow-y-auto space-y-4 pr-2">
            <h1 className="text-3xl font-bold">{data.title || data.name}</h1>
            <p className="text-gray-400 flex items-center gap-2">
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
