"use client";

import Movies from "@/components/Movies/movies";
import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState({});

  const getMovies = async () => {
    const res = await axios.get("http://localhost:8080/api/v1/movies");
    setMovies(res.data);
  };

  const getMovieData = async (id) => {
    const res = await axios.get(`http://localhost:8080/api/v1/movies/${id}`);
    setMovie(res.data);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <>
      <Movies movies={movies} />
    </>
  );
};

export default Home;
