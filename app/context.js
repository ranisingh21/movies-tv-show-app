"use client";

import { createContext, useState, useEffect } from "react";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("avenger");
  const apiKey = "8d887131";

  useEffect(() => {
    fetch(`http://www.omdbapi.com/?s=${query}&apikey=${apiKey}`)
      .then((res) => res.json())
      .then((data) => setMovies(data.Search || []));
  }, [query]);

  return (
    <MovieContext.Provider value={{ movies, setQuery }}>
      {children}
    </MovieContext.Provider>
  );
};
