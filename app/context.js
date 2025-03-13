"use client";

import { createContext, useState, useEffect } from "react";

export const MovieDataContext = createContext();

export const MovieDataProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("kick");
  const [selectedMovie, setSelectedMovie] = useState();

  const apiKey = "8d887131";

  const fetchMovies = async (movieId) => {
    try {
      let url;
      if (movieId !== undefined) {
        url = `https://www.omdbapi.com/?i=${movieId}&apikey=${apiKey}`;
      } else {
        url = `https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`;
      }
      const res = await fetch(url);
      const data = await res.json();

      if (data.Response === "False") {
        setMovies([])
      } else {
        if (movieId) {
          setSelectedMovie(data);
        } else {
          setMovies(data.Search);
        }
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [query]);

  return (
    <MovieDataContext.Provider
      value={{ movies, setQuery, fetchMovies, selectedMovie }}
    >
      {children}
    </MovieDataContext.Provider>
  );
};
