import { useEffect } from "react";
import type { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchResultsById } from "../thunks/animeByIdThunk";
import { useParams } from "react-router-dom";
import DetailsLoading from "../components/DetailsLoading";

function DetailPage() {
  const { data, loading, error } = useSelector(
    (state: RootState) => state.animeById
  );
  const { id } = useParams<{ id: string }>();
  const intId = Number(id);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchResultsById({ id: intId }));
  }, [dispatch]);

  if (error)
    return (
      <div className="p-10">
        <p className="text-red-500">{error}</p>;
      </div>
    );

  return (
    <div className="p-10">
      {loading ? (
        <DetailsLoading />
      ) : (
        data && (
          <>
            <p className="font-bold text-2xl">{data?.title}</p>

            <div className="mt-4 flex flex-col md:flex-row gap-6">
              <div className="w-full flex flex-col gap-6 p-4 border-2 border-gray-200">
                <div className="flex justify-center">
                  <img src={data?.images.jpg.image_url} alt="main_img" />
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {data?.genres.map((genre) => (
                    <div
                      className="rounded-lg bg-gray-400 p-1"
                      key={genre.mal_id}
                    >
                      <p className="text-center text-xs">{genre.name}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-4">
                  {data?.titles.map((title, index) => (
                    <div className="flex gap-4" key={`${title.type}-${index}`}>
                      <div className="w-1/2">
                        <p className="text-base">{title.type}:</p>
                      </div>
                      <div className="w-1/2">
                        <p className="text-base">{title.title}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <p className="font-medium">Year Release: </p>
                  <p>{data?.year || "N/A"}</p>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <div>
                  <p className="font-medium">Synopsis: </p>
                  <p>{data?.synopsis}</p>
                </div>

                <div>
                  <p className="font-medium">Episodes: </p>
                  <p>{data?.episodes}</p>
                </div>

                <div>
                  <p className="font-medium">Status: </p>
                  <p>{data?.status}</p>
                </div>

                <div>
                  <p className="font-medium">Studios: </p>
                  {data?.studios.map((studio) => (
                    <p className="text-base" key={studio.mal_id}>
                      {studio.name}
                    </p>
                  ))}
                </div>

                <div>
                  <p className="font-medium">Rating: </p>
                  <p className="text-base">{data?.rating}</p>
                </div>

                <div>
                  <p className="font-medium">Producers: </p>
                  {data?.producers.map((producer, index) => (
                    <span className="text-base" key={producer.mal_id}>
                      {producer.name}
                      {data?.producers.length > 1 &&
                        index !== data?.producers.length - 1 &&
                        ", "}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
}

export default DetailPage;
