import { ImageGrid } from "@/components";
import { PERSON_ENDPOINT, type PersonResponse } from "@/core";
import { useTmdb } from "@/hooks";
import { useParams } from "react-router-dom";

export const ImagesView = () => {
  const { id } = useParams();
  const { data } = useTmdb<PersonResponse>(
    `${PERSON_ENDPOINT}/${id}`,
    { append_to_response: "images" },
    [id],
  );

  const gridData = (data?.images?.profiles ?? []).map((result) => ({
    uniqueId: result.file_path,
    id: 0,
    imagePath: result.file_path,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="p-5">
      <h2 className="text-2xl font-bold mb-6">Images</h2>
      {data.images?.profiles.length ? (
        <ImageGrid results={gridData} />
      ) : (
        <p className="text-gray-400 text-center">No images available.</p>
      )}
    </section>
  );
};
