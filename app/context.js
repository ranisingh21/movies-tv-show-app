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
    try {
      let url;
      if (movieId !== undefined) {
        url = `http://www.omdbapi.com/?i=${movieId}&apikey=${apiKey}`;
      } else {
        url = `http://www.omdbapi.com/?s=${query}&apikey=${apiKey}`;
      }
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
      <p>setError("Something went wrong. Please try again.")</p>;
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [query]);

  return (
    <MovieDataContext.Provider
      value={{ movies, setQuery, fetchMovies, selectedMovie, error }}
    >
      {children}
    </MovieDataContext.Provider>
  );
};