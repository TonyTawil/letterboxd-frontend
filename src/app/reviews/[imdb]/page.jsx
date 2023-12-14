"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Reviews from "@/components/Reviews/reviews";
import endpoint from "@/constants/endpoint";

export default function Page({ params }) {
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const imdb = params.imdb;

  const getMovieData = async () => {
    const res = await axios.get(`${endpoint}/api/v1/movies/${imdb}`);
    setMovie(res.data);
    setReviews(res.data.reviews);
  };

  useEffect(() => {
    getMovieData(imdb);
  }, []);

  return (
    <>
      <Reviews movie={movie} reviews={reviews} setReviews={setReviews} />
    </>
  );
}
