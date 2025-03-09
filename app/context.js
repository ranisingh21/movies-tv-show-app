"use client";

import { createContext, useState, useEffect } from "react";

export const MovieDataContext = createContext();

export const MovieDataProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("Ram");
  const [selectedMovie, setSelectedMovie] = useState();
  const [error, setError] = useState("");

  const apiKey = "8d887131";

  const fetchMovies = async (movieId) => {
    console.log(movieId, "rani");
    try {
      let url;
      console.log(url, "rani");
      if (movieId !== undefined) {
        url = `http://www.omdbapi.com/?i=${movieId}&apikey=${apiKey}`;
      } else {
        url = `http://www.omdbapi.com/?s=${query}&apikey=${apiKey}`;
      }
      console.log(url, "rani");
      const res = await fetch(url);
      const data = await res.json();

      if (data.Response === "False") {
        setError("No movies found!");
        setMovies([]);
      } else {
        setError("");
        if (movieId) {
          setSelectedMovie(data);
        } else {
          setMovies(data.Search);
        }
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [query]);

  return (
    <MovieDataContext.Provider value={{ movies, setQuery, fetchMovies, selectedMovie, error }}>
      {children}
    </MovieDataContext.Provider>
  );
};
