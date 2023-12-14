"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useGlobalContext } from "@/context/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import endpoint from "@/constants/endpoint";

const Movies = ({ movies }) => {
  const { userId } = useGlobalContext();
  const [watchedMovies, setWatchedMovies] = useState([]);

  const sortedMovies = [...movies].sort((a, b) => {
    const aIsWatched = watchedMovies.includes(a.imdbId);
    const bIsWatched = watchedMovies.includes(b.imdbId);

    if (aIsWatched && !bIsWatched) {
      return -1;
    }
    if (!aIsWatched && bIsWatched) {
      return 1;
    }
    return 0;
  });

  const addMovieToWatchlist = async (imdbId) => {
    try {
      const response = await axios.put(`${endpoint}/api/v1/users/addMovie`, {
        imdbId: imdbId,
        userId: userId,
      });
      if (response.data) {
        setWatchedMovies([...watchedMovies, imdbId]);
        sessionStorage.setItem("watchedMovies", [...watchedMovies, imdbId]);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const removeMovieFromWatchlist = async (imdbId) => {
    try {
      const response = await axios.delete(
        `${endpoint}/api/v1/users/removeMovie`,
        {
          data: {
            imdbId: imdbId,
            userId: userId,
          },
        }
      );
      if (response.data) {
        setWatchedMovies(watchedMovies.filter((id) => id !== imdbId));
        sessionStorage.setItem(
          "watchedMovies",
          watchedMovies.filter((id) => id !== imdbId)
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const storedWatchedMovies = sessionStorage.getItem("watchedMovies");
    setWatchedMovies(storedWatchedMovies ? storedWatchedMovies.split(",") : []);
  }, []);

  return (
    <div className="flex flex-wrap">
      {sortedMovies?.map((movie) => {
        return (
          <div key={movie.imdbId} className="w-64 m-2">
            <div
              className="bg-cover bg-center h-80"
              style={{ backgroundImage: `url(${movie.backdrops[0]})` }}
            >
              <div className="p-4">
                <div className="mb-4 h-48 w-48">
                  <img
                    src={movie.poster}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="bg-white p-4 h-32">
              <h4 className="text-lg font-bold mb-6 h-10">{movie.title}</h4>
              <div className="flex justify-between mt-2">
                <Link
                  href={`/trailer/${movie.trailerLink.substring(
                    movie.trailerLink.length - 11
                  )}`}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Play
                </Link>
                <button
                  onClick={() =>
                    watchedMovies.includes(movie.imdbId)
                      ? removeMovieFromWatchlist(movie.imdbId)
                      : addMovieToWatchlist(movie.imdbId)
                  }
                  className={`font-bold py-2 px-4 rounded ${
                    watchedMovies.includes(movie.imdbId)
                      ? "bg-gray-500"
                      : "bg-green-500"
                  }`}
                >
                  <FontAwesomeIcon icon={faClock} />
                </button>
                <Link
                  href={`/reviews/${movie.imdbId}`}
                  className="bg-yellow-500 hover:bg-yellow-700 text-black font-bold py-2 px-4 rounded"
                >
                  Reviews
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Movies;
