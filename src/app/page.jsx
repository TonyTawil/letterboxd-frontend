"use client";

import Movies from "@/components/Movies/movies";
import { useState, useEffect } from "react";
import axios from "axios";
import endpoint from "@/constants/endpoint";

const Home = () => {
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    const res = await axios.get(`${endpoint}/api/v1/movies`);
    setMovies(res.data);
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
