import { LinkGroup } from "@/components";
import { type PersonResponse, IMAGE_BASE_URL, PERSON_ENDPOINT } from "@/core";
import { useTmdb } from "@/hooks";
import { FaCalendarAlt } from "react-icons/fa";
import { Outlet, useParams } from "react-router-dom";

export const PersonView = () => {
  const { id } = useParams();
  const { data } = useTmdb<PersonResponse>(
    `${PERSON_ENDPOINT}/${id}`,
    { append_to_response: "images,combined_credits" },
    [id],
  );

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex flex-1 min-h-0 gap-5 p-5">
        <img
          className="w-[220px] h-[330px] object-cover rounded-xl shrink-0"
          src={`${IMAGE_BASE_URL}${data.profile_path}`}
          alt={data.name}
        />
        <div className="flex-1 min-h-0 overflow-y-auto space-y-4 pr-2">
          <h1 className="text-3xl font-bold">{data.name}</h1>
          <p className="text-gray-400 flex items-center gap-2">
            <FaCalendarAlt />
            {data.place_of_birth}
          </p>
          <p className="text-gray-400 flex items-center gap-2">
            <FaCalendarAlt />
            {data.birthday}
          </p>
          <p className="text-gray-300">{data.biography}</p>
          <LinkGroup
            options={[
              { label: "Career", to: "career" },
              { label: "Images", to: "images" },
            ]}
          />
          <div className="pt-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
