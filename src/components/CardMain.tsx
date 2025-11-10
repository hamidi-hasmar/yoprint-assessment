import { Link } from "react-router-dom";
import type { AnimeFullList } from "../types/types";

export interface CardMainProps {
  anime: AnimeFullList["data"][0];
}

function CardMain({ anime }: CardMainProps) {
  return (
    <div
      className="border-2 border-gray-100 shadow-lg rounded-lg p-4 bg-white"
      key={anime.mal_id}
    >
      <div className="flex justify-center">
        <img
          src={anime.images.jpg.image_url}
          alt="anime"
          width={200}
          height={200}
        />
      </div>

      <div className="my-4 grid grid-cols-2 gap-2">
        {anime.genres.map((genre) => (
          <div className="rounded-lg bg-gray-400 p-1" key={genre.mal_id}>
            <p className="text-center text-xs">{genre.name}</p>
          </div>
        ))}
      </div>

      <div className="my-4">
        <p className="font-bold">{anime.title}</p>
      </div>

      <div className="flex">
        <div className="w-1/2">
          <p>Japanese Title: </p>
        </div>
        <div className="w-1/2">
          <p>{anime.title_japanese}</p>
        </div>
      </div>

      <div className="relative bottom-0 mt-4">
        <Link
          to={`/details/${anime.mal_id}`}
          className="text-blue-500 hover:underline"
        >
          See Details
        </Link>
      </div>
    </div>
  );
}

export default CardMain;
