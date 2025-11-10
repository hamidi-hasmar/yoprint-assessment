import React, { useEffect, useState } from "react";
import type { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchResults } from "../thunks/animeThunks";
import Loading from "../components/Loading";
import CardMain from "../components/CardMain";
import type { AnimeFullList } from "../types/types";

function SearchPage() {
  const { data, loading, error, pagination } = useSelector(
    (state: RootState) => state.anime
  );
  const dispatch = useDispatch<AppDispatch>();

  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setPage(1);
  };

  useEffect(() => {
    dispatch(fetchResults({ q: "", page: 1 })); // fetch default on mount
  }, [dispatch]);

  useEffect(() => {
    const delay = setTimeout(() => {
      const promise = dispatch(fetchResults({ q: query, page }));

      return () => {
        promise.abort();
      };
    }, 250);

    return () => clearTimeout(delay);
  }, [query, page, dispatch]);

  if (error)
    return (
      <div className="p-10">
        <p className="text-red-500">{error}</p>;
      </div>
    );

  const handleNextPage = () => {
    if (pagination?.has_next_page) {
      setPage((prev) => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div>
      <div className="flex justify-center py-10">
        <div className="w-3/4">
          <div className="flex justify-center items-center">
            <label htmlFor="search" className="mr-2">
              Search:
            </label>
            <input
              type="text"
              className="shadow border-2 border-gray-200 rounded py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-1/2"
              onChange={(e) => onChange(e)}
            />
          </div>

          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {loading &&
              Array.from({ length: 10 }).map((_, idx) => (
                <div
                  key={idx}
                  className="border-2 border-gray-100 shadow-lg rounded-lg p-4 bg-white animate-pulse"
                >
                  <Loading />
                </div>
              ))}

            {data?.map((anime: AnimeFullList["data"][0]) => (
              <CardMain anime={anime} key={anime.mal_id} />
            ))}
          </div>
        </div>
      </div>
      {pagination?.last_visible_page && (
        <div className="flex justify-center gap-4 my-4">
          <button
            onClick={handlePrevPage}
            disabled={page === 1 || loading}
            className={`${page === 1 ? "opacity-50" : ""}`}
          >
            Prev
          </button>
          <span>Page {page}</span>
          <button
            onClick={handleNextPage}
            disabled={!pagination?.has_next_page || loading}
            className={`${!pagination?.has_next_page ? "opacity-50" : ""}`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default SearchPage;
